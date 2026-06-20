import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const envPath = path.resolve('.env');
if (existsSync(envPath)) {
  const envContent = await readFile(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
}

const CHONKIEJS_DOCS_URL = process.env.CHONKIEJS_DOCS_URL;
if (!CHONKIEJS_DOCS_URL) {
  console.error('CHONKIEJS_DOCS_URL env variable is not set (check .env file)');
  process.exit(1);
}

const base = CHONKIEJS_DOCS_URL.replace(/\/$/, '');
const outDir = path.resolve('chonkiejs');

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

async function sync() {
  console.log(`Syncing chonkiejs-docs from ${base}...`);

  const manifestUrl = `${base}/manifest.json`;
  const manifest = JSON.parse(await fetchText(manifestUrl));

  for (const filePath of manifest.files) {
    const url = `${base}/${filePath}`;
    const content = await fetchText(url);
    const dest = path.join(outDir, filePath);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, content);
    console.log(`  ${filePath}`);
  }

  console.log('Done.');
}

sync();
