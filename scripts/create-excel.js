const XLSX = require('xlsx');
const fs = require('fs');

// Read the CSV file
const csvContent = fs.readFileSync('otvorenje-signups.csv', 'utf8');
const lines = csvContent.split('\n');

// Parse CSV
const data = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;

  // Parse CSV line (handles quoted fields)
  const row = [];
  let field = '';
  let inQuotes = false;

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '"') {
      if (inQuotes && line[j + 1] === '"') {
        field += '"';
        j++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(field);
      field = '';
    } else {
      field += char;
    }
  }
  row.push(field);
  data.push(row);
}

// Create workbook
const wb = XLSX.utils.book_new();

// Create worksheet from data
const ws = XLSX.utils.aoa_to_sheet(data);

// Set column widths
ws['!cols'] = [
  { wch: 12 },  // Datum
  { wch: 25 },  // Ime i prezime
  { wch: 35 },  // Email
  { wch: 18 },  // Telefon
  { wch: 15 },  // Razina iskustva
  { wch: 8 },   // Dob
  { wch: 18 },  // Padel iskustvo
  { wch: 15 },  // Veličina majice
  { wch: 25 },  // Prehrambena ograničenja
];

// Add worksheet to workbook
XLSX.utils.book_append_sheet(wb, ws, 'Prijave');

// Write file
const outputPath = 'otvorenje-prijave.xlsx';
XLSX.writeFile(wb, outputPath);

console.log(`✓ Created Excel file: ${outputPath}`);
console.log(`  Total signups: ${data.length - 1}`);
