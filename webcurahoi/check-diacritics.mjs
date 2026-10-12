import fs from 'fs';
import path from 'path';

let modifiedFiles = 0;
function check(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory() && f.name !== 'node_modules' && f.name !== '.next' && f.name !== '.git') {
      check(p);
    } else if (f.isFile() && /\.(tsx?|jsx?|json|mjs|css|html|txt|md)$/.test(f.name)) {
      const txt = fs.readFileSync(p, 'utf8');
      const norm = txt.normalize('NFC');
      if (txt !== norm) {
        console.log(`Normalized NFC for: ${p}`);
        modifiedFiles++;
        fs.writeFileSync(p, norm, 'utf8');
      }
    }
  }
}
check(process.cwd());
console.log(`Scan completed. Total files converted to NFC: ${modifiedFiles}`);

