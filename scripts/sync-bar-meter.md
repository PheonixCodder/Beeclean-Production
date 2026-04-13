# Bar Meter Frame Sync Script

Syncs the bar meter animation frames from the iOS project to the beeclean-framer public folder.

## Usage

```bash
npx tsx scripts/sync-bar-meter.ts
```

## What it does

- **Source**: `../BeeClean-IOS/apps/frontend/BeeClean/Assets.xcassets/BarMeterCropped/`
- **Destination**: `public/bar-meter-frames/`
- Renames frames from `Bar Meter Cropped_XXXXX.png` to `Bar_XXXXX.png` (144 frames total)

## After syncing

The `AnimatedBarCanvas` component will automatically use these frames. You can customize:

```tsx
<AnimatedBarCanvas
  totalFrames={144}           // Number of frames (default: 144)
  fps={60}                   // Animation speed (default: 60)
  width={200}                // Canvas width
  height={40}                // Canvas height
  framesPath="/bar-meter-frames" // Path to frames (default: /bar-meter-frames)
  loop={true}                // Loop animation (default: true)
  autoplay={true}            // Start automatically (default: true)
/>
```

## Notes

- The iOS frames are numbered 1-144 (zero-padded to 5 digits)
- The component expects frames named `Bar_XXXXX.png`
- Frames are served from the `public` folder automatically
