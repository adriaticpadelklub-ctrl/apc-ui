const Imap = require('imap');
const { simpleParser } = require('mailparser');
const fs = require('fs');

const imap = new Imap({
  user: process.env.EMAIL_USER || 'info@adriaticpadelklub.hr',
  password: process.env.EMAIL_PASSWORD,
  host: 'imap.hostinger.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
});

const signups = [];
const foldersToCheck = ['INBOX', 'Spam', 'Junk', 'INBOX.Spam', 'INBOX.Junk'];
let currentFolderIndex = 0;
let totalExpected = 0;
let totalProcessed = 0;

function parseSignupFromHtml(html) {
  const signup = {};

  const fields = [
    { key: 'name', label: 'Ime i prezime' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Telefon' },
    { key: 'experienceLevel', label: 'Razina iskustva' },
    { key: 'age', label: 'Dob' },
    { key: 'padelExperience', label: 'Padel iskustvo' },
    { key: 'shirtSize', label: 'Veličina majice' },
    { key: 'dietaryRestrictions', label: 'Prehrambena ograničenja' },
  ];

  for (const field of fields) {
    const regex = new RegExp(`${field.label}</td>\\s*<td[^>]*>([^<]*(?:<a[^>]*>([^<]*)</a>)?[^<]*)</td>`, 'i');
    const match = html.match(regex);
    if (match) {
      signup[field.key] = (match[2] || match[1]).trim();
    }
  }

  return signup;
}

function processFolder(folderName, callback) {
  imap.openBox(folderName, true, function(err, box) {
    if (err) {
      // Folder doesn't exist, skip it
      console.log(`Folder "${folderName}" not found, skipping...`);
      callback();
      return;
    }

    console.log(`Checking folder: ${folderName}...`);

    imap.search([['SUBJECT', 'Nova prijava za Mini Turnir']], function(err, results) {
      if (err) {
        console.error(`Error searching ${folderName}:`, err);
        callback();
        return;
      }

      if (!results || results.length === 0) {
        console.log(`  No signup emails in ${folderName}`);
        callback();
        return;
      }

      console.log(`  Found ${results.length} emails in ${folderName}`);
      totalExpected += results.length;

      const f = imap.fetch(results, { bodies: '' });

      f.on('message', function(msg, seqno) {
        msg.on('body', function(stream, info) {
          simpleParser(stream, (err, parsed) => {
            if (err) {
              console.error('Error parsing email:', err);
              totalProcessed++;
              checkComplete(callback);
              return;
            }

            const signup = parseSignupFromHtml(parsed.html || '');
            signup.date = parsed.date ? parsed.date.toISOString() : '';
            signup.subject = parsed.subject || '';
            signup.folder = folderName;

            if (signup.name) {
              // Check for duplicates by email
              const exists = signups.find(s => s.email === signup.email);
              if (!exists) {
                signups.push(signup);
              }
            }

            totalProcessed++;
            checkComplete(callback);
          });
        });
      });

      f.once('error', function(err) {
        console.error('Fetch error:', err);
        callback();
      });
    });
  });
}

function checkComplete(callback) {
  if (totalProcessed >= totalExpected) {
    callback();
  }
}

function processNextFolder() {
  if (currentFolderIndex >= foldersToCheck.length) {
    saveResults();
    return;
  }

  const folder = foldersToCheck[currentFolderIndex];
  currentFolderIndex++;

  processFolder(folder, function() {
    processNextFolder();
  });
}

function saveResults() {
  // Sort by date
  signups.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Create CSV
  const headers = ['Datum', 'Ime i prezime', 'Email', 'Telefon', 'Razina iskustva', 'Dob', 'Padel iskustvo', 'Veličina majice', 'Prehrambena ograničenja'];
  const csvRows = [headers.join(',')];

  for (const s of signups) {
    const row = [
      s.date ? new Date(s.date).toLocaleDateString('hr-HR') : '',
      s.name || '',
      s.email || '',
      s.phone || '',
      s.experienceLevel || '',
      s.age || '',
      s.padelExperience || '',
      s.shirtSize || '',
      s.dietaryRestrictions || '',
    ].map(val => `"${String(val).replace(/"/g, '""')}"`);
    csvRows.push(row.join(','));
  }

  const csvContent = csvRows.join('\n');
  const outputPath = 'otvorenje-signups.csv';
  fs.writeFileSync(outputPath, csvContent, 'utf8');

  console.log(`\n✓ Exported ${signups.length} signups to ${outputPath}`);
  console.log('\nSignups:');
  signups.forEach((s, i) => {
    console.log(`${i + 1}. ${s.name} - ${s.email} - ${s.experienceLevel}`);
  });

  imap.end();
}

imap.once('ready', function() {
  console.log('Connected to email server.\n');
  processNextFolder();
});

imap.once('error', function(err) {
  console.error('Connection error:', err);
});

imap.once('end', function() {
  console.log('\nConnection ended.');
});

imap.connect();
