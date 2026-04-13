import fs from 'fs';
import path from 'path';

// Source: iOS BarMeterCropped folder (144 frames)
const sourceDir = path.join(process.cwd(), '..', 'BeeClean-IOS', 'apps', 'frontend', 'BeeClean', 'Assets.xcassets', 'BarMeterCropped');

// Destination: beeclean-framer/public/bar-meter-frames
const destDir = path.join(process.cwd(), 'public', 'bar-meter-frames');

// Create destination folder if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`Created directory: ${destDir}`);
}

// Read all .imageset folders
const items = fs.readdirSync(sourceDir).filter(name => name.endsWith('.imageset'));

console.log(`Found ${items.length} frames to sync`);

let copied = 0;
let skipped = 0;

items.forEach((folderName, index) => {
  const folderPath = path.join(sourceDir, folderName);
  const stat = fs.statSync(folderPath);

  if (!stat.isDirectory()) {
    return;
  }

  // Extract the frame number from folder name (e.g., "Bar Meter Cropped_00001.imageset" -> "00001")
  const match = folderName.match(/Bar Meter Cropped_(\d{5})\.imageset/);
  if (!match) {
    console.log(`Skipping ${folderName}: doesn't match expected pattern`);
    skipped++;
    return;
  }

  const frameNumber = match[1]; // "00001", "00002", etc.
  const pngFileName = `Bar Meter Cropped_${frameNumber}.png`;
  const sourcePngPath = path.join(folderPath, pngFileName);

  if (!fs.existsSync(sourcePngPath)) {
    console.log(`Skipping frame ${frameNumber}: PNG not found`);
    skipped++;
    return;
  }

  // Destination file name: Bar_XXXXX.png
  const destFileName = `Bar_${frameNumber}.png`;
  const destPath = path.join(destDir, destFileName);

  try {
    fs.copyFileSync(sourcePngPath, destPath);
    copied++;
  } catch (error) {
    console.error(`Error copying frame ${frameNumber}:`, error);
    skipped++;
  }
});

console.log(`\nSync complete!`);
console.log(`  Copied: ${copied}`);
console.log(`  Skipped: ${skipped}`);
console.log(`  Total: ${items.length}`);
console.log(`\nFrames available at: ${destDir}`);
