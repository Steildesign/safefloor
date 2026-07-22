import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const sourceDir = new URL('../assets/brand/source/', import.meta.url);
const outputDir = new URL('../assets/brand/', import.meta.url);

const transparentLogo = fileURLToPath(new URL('safefloor-logo-color-transparent.png', sourceDir));
const backgroundLogo = fileURLToPath(new URL('safefloor-logo-color-background.png', sourceDir));
const outputPath = (name) => fileURLToPath(new URL(name, outputDir));

await sharp(transparentLogo)
  .resize({ width: 1024, kernel: sharp.kernel.lanczos3 })
  .png({ compressionLevel: 9 })
  .toFile(outputPath('safefloor-logo-ui.png'));

const pearlMask = Buffer.from(`
  <svg width="512" height="526" viewBox="0 0 512 526">
    <ellipse cx="256" cy="263" rx="247" ry="247" fill="#fff"/>
  </svg>
`);

await sharp(transparentLogo)
  .extract({ left: 31, top: 30, width: 70, height: 72 })
  .resize(512, 526, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
  .composite([{ input: pearlMask, blend: 'dest-in' }])
  .png({ compressionLevel: 9 })
  .toFile(outputPath('safefloor-pearl.png'));

await sharp(backgroundLogo)
  .resize(1024, 1024, {
    fit: 'contain',
    background: { r: 5, g: 13, b: 23, alpha: 1 },
    kernel: sharp.kernel.lanczos3,
  })
  .png({ compressionLevel: 9 })
  .toFile(outputPath('safefloor-icon.png'));

console.log('SAFEFLOOR brand assets generated from the supplied official files.');
