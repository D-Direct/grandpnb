// Simple image conversion script
// Run with: node convert-images.js
// Requires: npm install jimp

const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const imagesToConvert = [
  'public/assets/hero/344e2.png',
  'public/assets/hero/487f0.png',
  'public/assets/hero/ca2ea.png',
  'public/assets/hero/fad68.png',
  'public/assets/packages/10_Night-11Days.jpeg',
  'public/assets/packages/14_Night_-_15_Days.jpeg',
  'public/assets/packages/427af.png',
  'public/assets/packages/726f4.png',
  'public/assets/packages/8b9bd.png',
  'public/assets/packages/8d8b2.png',
  'public/assets/our-guests/23619.png',
  'public/assets/our-guests/64776.png',
  'public/assets/our-guests/65b5d.png',
  'public/assets/our-guests/8428e.png',
  'public/assets/our-guests/a8e63.png',
  'public/assets/our-guests/c6376.png',
  'public/assets/our-guests/cc8f1.png',
  'public/assets/our-guests/d2502.png',
  'public/assets/our-guests/e591e.png',
  'public/assets/our-guests/f4a0b.png',
  'public/assets/lasting-memories/60591.png',
  'public/assets/lasting-memories/bab8a.png',
  'public/assets/map.jfif',
];

async function convertToWebP(imagePath) {
  try {
    const outputPath = imagePath.replace(/\.(png|jpg|jpeg|jfif)$/i, '.webp');
    console.log(`Converting: ${imagePath} -> ${outputPath}`);

    const image = await Jimp.read(imagePath);
    await image.quality(90).writeAsync(outputPath);

    console.log(`✓ Converted: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`✗ Error converting ${imagePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Starting image conversion to WebP...\n');

  let converted = 0;
  let failed = 0;

  for (const imagePath of imagesToConvert) {
    if (fs.existsSync(imagePath)) {
      const success = await convertToWebP(imagePath);
      if (success) converted++;
      else failed++;
    } else {
      console.log(`⚠ File not found: ${imagePath}`);
      failed++;
    }
  }

  console.log(`\n✓ Converted: ${converted}`);
  console.log(`✗ Failed: ${failed}`);
  console.log('\nDone! Now you can delete the old PNG/JPEG files if conversion was successful.');
}

main();
