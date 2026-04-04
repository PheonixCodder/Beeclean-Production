const fs = require('fs');
const path = require('path');

// Get the project root (current script directory's parent)
const projectRoot = path.resolve(__dirname, '..');

// Source: iOS asset catalog (use absolute path)
const sourceDir = 'C:/Users/ubaid/OneDrive/Desktop/Beeclean Prod/BeeClean-IOS/apps/frontend/BeeClean/Assets.xcassets/Bee';

// Destination: Next.js public folder (absolute)
const destDir = path.join(projectRoot, 'public', 'images', 'bee-frames');

// Ensure destination exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Find all PNG files in .imageset folders
const files = fs.readdirSync(sourceDir)
  .filter(f => f.endsWith('.imageset'))
  .map(f => path.join(sourceDir, f, 'Bee_00001.png')) // Simplified - gets first frame in each set
  .concat(...fs.readdirSync(sourceDir)
    .filter(f => f.endsWith('.imageset'))
    .flatMap(folder => {
      const folderPath = path.join(sourceDir, folder);
      const pngFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.png'));
      return pngFiles.map(file => path.join(folderPath, file));
    })
  );

// Actually, let's get them properly
const allFrames = [];
for (const folder of fs.readdirSync(sourceDir)) {
  if (folder.endsWith('.imageset')) {
    const pngMatch = folder.match(/Bee_(\d{5})\.imageset/);
    if (pngMatch) {
      const frameNum = pngMatch[1];
      const pngPath = path.join(sourceDir, folder, `Bee_${frameNum}.png`);
      if (fs.existsSync(pngPath)) {
        allFrames.push({ frameNum, pngPath });
      }
    }
  }
}

// Sort by frame number
allFrames.sort((a, b) => parseInt(a.frameNum) - parseInt(b.frameNum));

console.log(`Found ${allFrames.length} bee frames`);

// Copy all frames
allFrames.forEach(({ frameNum, pngPath }) => {
  const destFile = path.join(destDir, `Bee_${frameNum}.png`);
  fs.copyFileSync(pngPath, destFile);
});

console.log(`✓ Copied ${allFrames.length} frames to ${destDir}`);
