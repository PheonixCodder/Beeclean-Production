"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface AnimatedBeeHappyCanvasProps {
  // 150th image to 372nd image (using 0-based index for logic, so 149 to 371)
  startFrame?: number;
  endFrame?: number;
  fps?: number;
  width?: number;
  height?: number;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  onComplete?: () => void;
  framesPath?: string;
}

export default function AnimatedBeeHappyHappyCanvas({
  startFrame = 149, // 150th image (0-based)
  endFrame = 371, // 372nd image (0-based)
  fps = 60,
  width,
  height,
  className = "",
  autoplay = true,
  loop = true,
  onComplete,
  framesPath = "/bee-frames",
}: AnimatedBeeHappyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Core refs
  const framesRef = useRef<Record<number, HTMLImageElement>>({});
  // Initialize current frame at startFrame
  const currentFrameRef = useRef(startFrame);
  const animationIdRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const isPlayingRef = useRef(false);
  const frameIntervalRef = useRef(1000 / fps);

  // Double buffering: two canvases to prevent flicker
  const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bufferCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Adjusted to handle 0-based frame input mapping to 1-based file names
  const getFrameUrl = (frameNum: number) => {
    const padded = String(frameNum + 1).padStart(5, "0");
    return `${framesPath}/Bee_${padded}.png`;
  };

  // Compute actual dimensions
  const canvasWidth = width ?? height ?? 300;
  const canvasHeight = height ?? width ?? 300;

  // Initialize buffer canvas (offscreen)
  useEffect(() => {
    const bufferCanvas = document.createElement("canvas");
    bufferCanvas.width = canvasWidth;
    bufferCanvas.height = canvasHeight;
    const bufferCtx = bufferCanvas.getContext("2d", {
      alpha: true,
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

  // Preload frames within range
  useEffect(() => {
    if (!autoplay) return;

    // Reset frame to start
    currentFrameRef.current = startFrame;

    const preload = async () => {
      // Preload first 30 frames of the sequence for fast start
      const preloadAmount = 30;
      const loadPromises: Promise<void>[] = [];

      for (
        let i = startFrame;
        i <= Math.min(startFrame + preloadAmount, endFrame);
        i++
      ) {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getFrameUrl(i);
          img
            .decode?.()
            .then(() => {
              framesRef.current[i] = img;
              resolve();
            })
            .catch(() => {
              framesRef.current[i] = img; // Fallback
              resolve();
            });
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
        loadPromises.push(promise);
      }

      await Promise.all(loadPromises);
      setIsReady(true);

      // Background load remaining frames
      for (let i = startFrame + preloadAmount + 1; i <= endFrame; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.loading = "lazy";
        img.onload = () => {
          framesRef.current[i] = img;
        };
      }
    };

    preload();
  }, [autoplay, startFrame, endFrame, getFrameUrl]);

  // Animation loop
  const animate = useCallback(
    (time: number) => {
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

      // Only draw if frame is fully loaded
      if (frameImg && frameImg.complete && frameImg.naturalWidth > 0) {
        bufferCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        bufferCtx.drawImage(frameImg, 0, 0, canvasWidth, canvasHeight);

        const mainCtx = canvas.getContext("2d", { alpha: true });
        if (mainCtx) {
          mainCtx.clearRect(0, 0, canvasWidth, canvasHeight);
          mainCtx.drawImage(bufferCanvas, 0, 0);
        }
      }

      // Advance frame within range
      let nextFrame = currentFrame + 1;
      if (nextFrame > endFrame) {
        if (loop) {
          nextFrame = startFrame; // Loop back to 150th image
        } else {
          isPlayingRef.current = false;
          onComplete?.();
          return;
        }
      }
      currentFrameRef.current = nextFrame;

      lastTimeRef.current = time;
      animationIdRef.current = requestAnimationFrame(animate);
    },
    [startFrame, endFrame, loop, onComplete, canvasWidth, canvasHeight],
  );

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

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className={`inline-block ${className}`}
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        imageRendering: "auto",
        backgroundColor: "transparent",
      }}
    />
  );
}
