import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const images = [
  {
    input: 'public/assets/welcome.webp',
    output: 'public/assets/welcome.webp',
    width: 1920, // Max width for hero image
    quality: 85
  },
  {
    input: 'public/assets/lasting-memories/beach.webp',
    output: 'public/assets/lasting-memories/beach.webp',
    width: 1200, // Gallery images don't need to be as large
    quality: 85
  },
  {
    input: 'public/assets/lasting-memories/waterfall.webp',
    output: 'public/assets/lasting-memories/waterfall.webp',
    width: 1200,
    quality: 85
  }
];

async function resizeImages() {
  const fs = await import('fs');

  for (const img of images) {
    try {
      const inputPath = join(__dirname, img.input);
      const outputPath = join(__dirname, img.output);
      const tempPath = outputPath + '.tmp';

      console.log(`Resizing ${img.input}...`);

      await sharp(inputPath)
        .resize(img.width, null, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: img.quality })
        .toFile(tempPath);

      // Delete original file first, then rename temp
      try {
        fs.unlinkSync(outputPath);
      } catch (e) {
        // File might not exist, ignore
      }

      fs.renameSync(tempPath, outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`✓ ${img.input} resized (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    } catch (error) {
      console.error(`Error resizing ${img.input}:`, error.message);
    }
  }

  console.log('\nAll images resized successfully!');
}

resizeImages();
