import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { statSync, unlinkSync, renameSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const images = [
  {
    input: 'public/assets/welcome.webp',
    output: 'public/assets/welcome.webp',
    maxWidth: 1920,
    targetSize: 300 * 1024, // 300 KB
  },
  {
    input: 'public/assets/lasting-memories/beach.webp',
    output: 'public/assets/lasting-memories/beach.webp',
    maxWidth: 1200,
    targetSize: 300 * 1024,
  },
  {
    input: 'public/assets/lasting-memories/waterfall.webp',
    output: 'public/assets/lasting-memories/waterfall.webp',
    maxWidth: 1200,
    targetSize: 300 * 1024,
  },
  {
    input: 'public/assets/lasting-memories/ancient.webp',
    output: 'public/assets/lasting-memories/ancient.webp',
    maxWidth: 1200,
    targetSize: 300 * 1024,
  },
];

async function compressImage(img) {
  const inputPath = join(__dirname, img.input);
  const outputPath = join(__dirname, img.output);
  const tempPath = outputPath + '.tmp';

  console.log(`\nCompressing ${img.input}...`);

  let quality = 85;
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    try {
      await sharp(inputPath)
        .resize(img.maxWidth, null, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality })
        .toFile(tempPath);

      const stats = statSync(tempPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      const sizeKB = (stats.size / 1024).toFixed(0);

      console.log(`  Quality ${quality}: ${sizeKB} KB (${sizeMB} MB)`);

      if (stats.size <= img.targetSize) {
        // Success! Replace original
        try {
          unlinkSync(outputPath);
        } catch (e) {
          // File might not exist
        }
        renameSync(tempPath, outputPath);
        console.log(`✓ ${img.input} compressed to ${sizeKB} KB`);
        return;
      }

      // Too large, reduce quality
      unlinkSync(tempPath);
      quality -= 5;
      attempts++;
    } catch (error) {
      console.error(`Error compressing ${img.input}:`, error.message);
      try {
        unlinkSync(tempPath);
      } catch (e) {
        // Ignore
      }
      return;
    }
  }

  console.log(`⚠ Could not compress ${img.input} to under ${img.targetSize / 1024} KB`);
}

async function compressAll() {
  for (const img of images) {
    await compressImage(img);
  }
  console.log('\n✓ All images compressed!');
}

compressAll();
