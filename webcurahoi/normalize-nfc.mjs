import fs from 'fs';
import path from 'path';

function normalizeDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        normalizeDir(fullPath);
      }
    } else if (entry.isFile() && /\.(tsx?|jsx?|json|css|md)$/i.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const normalized = content.normalize('NFC');
      if (content !== normalized) {
        fs.writeFileSync(fullPath, normalized, 'utf8');
        console.log(`Normalized NFC: ${fullPath}`);
      }
    }
  }
}

const rootDir = process.cwd();
console.log(`Starting NFC normalization in: ${rootDir}`);
normalizeDir(rootDir);
console.log('NFC normalization complete!');
