import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(projectRoot, 'public', 'og-image.svg');
const target = path.join(projectRoot, 'public', 'og-image.png');

const svg = await readFile(source);

const png = await sharp(svg, { density: 384 })
  .resize(1200, 630, { fit: 'contain', background: '#0B192C' })
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile(target, png);

const meta = await sharp(png).metadata();
if (meta.width !== 1200 || meta.height !== 630) {
  throw new Error(`Unexpected OG image size: ${meta.width}x${meta.height}`);
}

console.log(`og-image.png generated: ${meta.width}x${meta.height}, ${png.length} bytes`);