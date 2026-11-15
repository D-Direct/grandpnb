const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Function to convert a single image to WebP
async function convertToWebP(inputPath) {
  const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  try {
    await sharp(inputPath)
      .webp({ quality: 85 }) // 85% quality for good balance
      .toFile(outputPath);

    console.log(`✓ Converted: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    return outputPath;
  } catch (error) {
    console.error(`✗ Failed to convert ${inputPath}:`, error.message);
    return null;
  }
}

// Function to find all PNG and JPEG images recursively
function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findImages(filePath, fileList);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Main conversion function
async function convertAllImages() {
  const publicDir = path.join(__dirname, 'public', 'assets');

  console.log('🔍 Searching for images...\n');
  const images = findImages(publicDir);

  console.log(`Found ${images.length} images to convert\n`);

  let converted = 0;
  let failed = 0;

  for (const image of images) {
    const result = await convertToWebP(image);
    if (result) {
      converted++;
    } else {
      failed++;
    }
  }

  console.log(`\n✅ Conversion complete!`);
  console.log(`   Converted: ${converted}`);
  console.log(`   Failed: ${failed}`);
  console.log(`\n📝 Next step: Update image references in your code from .png/.jpg to .webp`);
}

// Run the conversion
convertAllImages().catch(console.error);
