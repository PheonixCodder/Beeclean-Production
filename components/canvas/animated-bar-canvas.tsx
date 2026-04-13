'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface AnimatedBarCanvasProps {
  totalFrames?: number;
  fps?: number;
  width?: number;  // Custom width
  height?: number; // Custom height
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  onComplete?: () => void;
  framesPath?: string;
}

export default function AnimatedBarCanvas({
  totalFrames = 144,
  fps = 2,
  width,
  height,
  className = '',
  autoplay = true,
  loop = true,
  onComplete,
  framesPath = '/bar-meter-frames',
}: AnimatedBarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Core refs
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const animationIdRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const isPlayingRef = useRef(false);
  const frameIntervalRef = useRef(1000 / fps);

  // Double buffering: two canvases to prevent flicker
  const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bufferCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const getFrameUrl = (frameNum: number) => {
    const padded = String(frameNum + 1).padStart(5, '0');
    return `${framesPath}/Bar_${padded}.png`;
  };

  // Compute actual dimensions
  const canvasWidth = width ?? height ?? 300;
  const canvasHeight = height ?? width ?? 300;

  // Initialize buffer canvas (offscreen)
  useEffect(() => {
    const bufferCanvas = document.createElement('canvas');
    bufferCanvas.width = canvasWidth;
    bufferCanvas.height = canvasHeight;
    const bufferCtx = bufferCanvas.getContext('2d', {
      alpha: true, // Preserve transparency
      desynchronized: true,
    });
    bufferCanvasRef.current = bufferCanvas;
    bufferCtxRef.current = bufferCtx;

    return () => {
      bufferCanvasRef.current = null;
      bufferCtxRef.current = null;
    };
  }, [canvasWidth, canvasHeight]);

  // Update frame interval when FPS changes
  useEffect(() => {
    frameIntervalRef.current = 1000 / fps;
  }, [fps]);

  // Preload frames with proper decoding
  useEffect(() => {
    if (!autoplay) return;

    const preload = async () => {
      // Preload first 90 frames (enough for 1.5 seconds at 60fps)
      const preloadCount = Math.min(90, totalFrames);
      const loadPromises: Promise<void>[] = [];

      for (let i = 0; i < preloadCount; i++) {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();

          // Important: Use decode() to ensure image is fully decoded
          img.src = getFrameUrl(i);

          // Use decode() for guaranteed decoding before use
          img.decode?.().then(() => {
            framesRef.current[i] = img;
            resolve();
          }).catch(() => {
            // If decode fails, still mark as loaded (will show blank)
            framesRef.current[i] = img;
            resolve();
          });

          // Fallback: also use onload
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });

        loadPromises.push(promise);
      }

      await Promise.all(loadPromises);
      setIsReady(true);

      // Continue loading remaining frames in background with lower priority
      if (preloadCount < totalFrames) {
        (async () => {
          for (let i = preloadCount; i < totalFrames; i++) {
            await new Promise<void>((resolve) => {
              const img = new Image();
              img.src = getFrameUrl(i);
              img.loading = 'lazy';

              // Don't wait for decode, just cache
              img.onload = () => {
                framesRef.current[i] = img;
                resolve();
              };
              img.onerror = () => resolve();
            });

            // Small delay to not block main thread
            if (i % 10 === 0) {
              await new Promise(resolve => setTimeout(resolve, 0));
            }
          }
        })();
      }
    };

    preload();
  }, [autoplay, totalFrames, getFrameUrl]);

  // Animation loop
  const animate = useCallback((time: number) => {
    if (!isPlayingRef.current) return;

    const canvas = canvasRef.current;
    const bufferCanvas = bufferCanvasRef.current;
    const bufferCtx = bufferCtxRef.current;

    if (!canvas || !bufferCanvas || !bufferCtx) return;

    // Check timing
    const frameInterval = frameIntervalRef.current;
    if (time - lastTimeRef.current < frameInterval) {
      animationIdRef.current = requestAnimationFrame(animate);
      return;
    }

    const currentFrame = currentFrameRef.current;
    const frameImg = framesRef.current[currentFrame];

    // Only draw if frame is fully loaded and decoded
    if (frameImg && frameImg.complete && frameImg.naturalWidth > 0) {
      // PRE-DRAW TO BUFFER (offscreen)
      bufferCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Check if image is actually ready (has dimensions)
      if (frameImg.naturalWidth > 0 && frameImg.naturalHeight > 0) {
        // Draw image to fill the canvas (stretched to fit)
        bufferCtx.drawImage(frameImg, 0, 0, canvasWidth, canvasHeight);

        // COPY BUFFER TO MAIN CANVAS (single operation, no flicker)
        const mainCtx = canvas.getContext('2d', { alpha: true });
        if (mainCtx) {
          mainCtx.clearRect(0, 0, canvasWidth, canvasHeight);
          mainCtx.drawImage(bufferCanvas, 0, 0);
        }
      }
    }

    // Advance frame
    const nextFrame = currentFrame + 1;
    if (nextFrame >= totalFrames) {
      if (loop) {
        currentFrameRef.current = 0;
      } else {
        isPlayingRef.current = false;
        onComplete?.();
        return;
      }
    } else {
      currentFrameRef.current = nextFrame;
    }

    lastTimeRef.current = time;
    animationIdRef.current = requestAnimationFrame(animate);
  }, [totalFrames, loop, onComplete, canvasWidth, canvasHeight]);

  // Start animation
  useEffect(() => {
    if (isReady && autoplay) {
      isPlayingRef.current = true;
      lastTimeRef.current = performance.now();
      animationIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      isPlayingRef.current = false;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isReady, autoplay, animate]);

  // Preload next frame immediately after current frame is shown
  useEffect(() => {
    if (!isReady) return;

    const preloadNextFrame = () => {
      const nextFrame = (currentFrameRef.current + 1) % totalFrames;
      if (!framesRef.current[nextFrame]) {
        const img = new Image();
        img.src = getFrameUrl(nextFrame);
        img.decode?.().then(() => {
          framesRef.current[nextFrame] = img;
        }).catch(() => {
          framesRef.current[nextFrame] = img;
        });
      }
    };

    // Preload next frame with small delay
    const timer = setTimeout(preloadNextFrame, 50);
    return () => clearTimeout(timer);
  }, [currentFrameRef.current, isReady, totalFrames, getFrameUrl]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className={`inline-block ${className}`}
      style={{
        // Critical: prevent flickering
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        imageRendering: 'auto',
        // Ensure transparent background
        backgroundColor: 'transparent',
        // Ensure smooth updates
        willChange: 'transform',
      }}
    />
  );
}
