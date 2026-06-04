const nodemailer = require('nodemailer');
const XLSX = require('xlsx');
const fs = require('fs');

// Read the HTML template
const htmlTemplate = fs.readFileSync('email-template.html', 'utf8');

// Read Excel file to get all emails
const wb = XLSX.readFile('otvorenje-prijave.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

// Get emails (skip header row)
const recipients = [];
for (let i = 1; i < data.length; i++) {
  const row = data[i];
  const name = row[1];
  const email = row[2];
  if (email && email.includes('@')) {
    recipients.push({ name, email: email.trim() });
  }
}

console.log(`Found ${recipients.length} recipients to email.\n`);

// Create transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'info@adriaticpadelklub.hr',
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send emails with delay to avoid rate limiting
async function sendEmails() {
  let sent = 0;
  let failed = 0;

  for (const recipient of recipients) {
    try {
      await transporter.sendMail({
        from: '"Adriatic Padel Klub" <info@adriaticpadelklub.hr>',
        to: recipient.email,
        subject: 'Mini Turnir - Potvrda dolaska | Adriatic Padel Klub',
        html: htmlTemplate
      });

      sent++;
      console.log(`✓ [${sent}/${recipients.length}] Sent to: ${recipient.name} <${recipient.email}>`);

      // Delay between emails (1 second) to avoid rate limiting
      if (sent < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      failed++;
      console.error(`✗ Failed to send to ${recipient.email}: ${error.message}`);
    }
  }

  console.log(`\n========================================`);
  console.log(`Done! Sent: ${sent}, Failed: ${failed}`);
  console.log(`========================================`);
}

// Verify connection first
transporter.verify()
  .then(() => {
    console.log('Connected to email server.\n');
    return sendEmails();
  })
  .catch(err => {
    console.error('Failed to connect to email server:', err.message);
    process.exit(1);
  });
