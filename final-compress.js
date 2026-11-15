import sharp from 'sharp';

const images = [
  { src: 'public/assets/welcome.webp', maxWidth: 1600, quality: 55 },
  { src: 'public/assets/lasting-memories/beach.webp', maxWidth: 1200, quality: 45 },
  { src: 'public/assets/lasting-memories/waterfall.webp', maxWidth: 1200, quality: 80 },
  { src: 'public/assets/lasting-memories/ancient.webp', maxWidth: 1200, quality: 60 },
];

for (const img of images) {
  await sharp(img.src)
    .resize(img.maxWidth, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: img.quality })
    .toFile(img.src + '.new');

  const fs = await import('fs');
  const stats = fs.statSync(img.src + '.new');
  console.log(`${img.src}: ${(stats.size / 1024).toFixed(0)} KB`);
}

console.log('\nDone! Now manually replace files with .new versions');
