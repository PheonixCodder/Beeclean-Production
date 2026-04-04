const fs = require('fs');
const path = require('path');

// This script converts PNG frames to WebP for 70% smaller file sizes
// Install sharp: npm install sharp

// const sharp = require('sharp');

const sourceDir = 'public/images/bee-frames';
const outputDir = 'public/images/bee-frames-webp';

// Notes: To actually run this, you'd need to:
// 1. npm install sharp
// 2. Uncomment the sharp import above
// 3. Uncomment the conversion code below

console.log('Bee Frames Optimization Script');
console.log('=============================');
console.log('');
console.log('This script will convert PNG frames to WebP format');
console.log('Expected size reduction: 70-80%');
console.log('');
console.log('Source:', sourceDir);
console.log('Output:', outputDir);
console.log('');

// Count frames
const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.png'));
console.log(`Found ${files.length} PNG frames`);

// If you have sharp installed, run conversion:
/*
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let converted = 0;
async function convert() {
  for (const file of files) {
    const inputPath = path.join(sourceDir, file);
    const outputPath = path.join(outputDir, file.replace('.png', '.webp'));

    try {
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);
      converted++;
      if (converted % 50 === 0) {
        console.log(`Converted ${converted}/${files.length}...`);
      }
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err.message);
    }
  }

  console.log(`✓ Successfully converted ${converted} frames to WebP`);

  // Calculate size savings
  let originalSize = 0, newSize = 0;
  files.forEach(file => {
    originalSize += fs.statSync(path.join(sourceDir, file)).size;
    const webpFile = file.replace('.png', '.webp');
    if (fs.existsSync(path.join(outputDir, webpFile))) {
      newSize += fs.statSync(path.join(outputDir, webpFile)).size;
    }
  });

  console.log(`Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${((1 - newSize / originalSize) * 100).toFixed(1)}%`);
}

convert().catch(console.error);
*/

console.log('To convert to WebP:');
console.log('1. Run: npm install sharp');
console.log('2. Uncomment the code in this script');
console.log('3. Run: node scripts/optimize-bee-frames.js');
console.log('');
console.log('For now, PNGs will work fine but are larger.');
