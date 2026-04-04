"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface AnimatedBeeCanvasProps {
  totalFrames?: number;
  fps?: number;
  width?: number;
  height?: number;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  onComplete?: () => void;
  framesPath?: string;
}

export default function ButtonBeeCanvas({
  totalFrames = 4,
  fps = 3,
  width = 40, // Default to 40 if not provided
  height = 40, // Default to 40 if not provided
  className = "",
  autoplay = true,
  loop = true,
  onComplete,
  framesPath = "/bee-store",
}: AnimatedBeeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const animationIdRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const isPlayingRef = useRef(false);
  const frameIntervalRef = useRef(1000 / fps);

  const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bufferCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const getFrameUrl = (frameNum: number) => {
    return `${framesPath}-${frameNum + 1}.png`;
  };

  // Initialize buffer canvas
  useEffect(() => {
    const bufferCanvas = document.createElement("canvas");
    bufferCanvas.width = width;
    bufferCanvas.height = height;
    const bufferCtx = bufferCanvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    // --- FIX 1: Set Smoothing to False for Sharp Small Images ---
    if (bufferCtx) {
      bufferCtx.imageSmoothingEnabled = false;
      // Support older browsers
      bufferCtx.webkitImageSmoothingEnabled = false;
      bufferCtx.mozImageSmoothingEnabled = false;
    }
    // -------------------------------------------------------------

    bufferCanvasRef.current = bufferCanvas;
    bufferCtxRef.current = bufferCtx;

    return () => {
      bufferCanvasRef.current = null;
      bufferCtxRef.current = null;
    };
  }, [width, height]);

  useEffect(() => {
    frameIntervalRef.current = 1000 / fps;
  }, [fps]);

  // Preload frames
  useEffect(() => {
    if (!autoplay) return;
    const preload = async () => {
      const loadPromises: Promise<void>[] = [];
      for (let i = 0; i < totalFrames; i++) {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => {
            framesRef.current[i] = img;
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load: ${img.src}`);
            resolve();
          };
        });
        loadPromises.push(promise);
      }
      await Promise.all(loadPromises);
      setIsReady(true);
    };
    preload();
  }, [autoplay, totalFrames, framesPath]);

  // Animation loop
  const animate = useCallback(
    (time: number) => {
      if (!isPlayingRef.current) return;
      const canvas = canvasRef.current;
      const bufferCanvas = bufferCanvasRef.current;
      const bufferCtx = bufferCtxRef.current;

      if (!canvas || !bufferCanvas || !bufferCtx) return;

      const frameInterval = frameIntervalRef.current;
      if (time - lastTimeRef.current < frameInterval) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const currentFrame = currentFrameRef.current;
      const frameImg = framesRef.current[currentFrame];

      if (frameImg) {
        bufferCtx.clearRect(0, 0, width, height);
        // --- FIX 2: Explicitly draw to buffer with crisp edges ---
        bufferCtx.drawImage(frameImg, 0, 0, width, height);

        const mainCtx = canvas.getContext("2d", { alpha: true });
        if (mainCtx) {
          mainCtx.clearRect(0, 0, width, height);
          mainCtx.drawImage(bufferCanvas, 0, 0);
        }
      }

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
    },
    [totalFrames, loop, onComplete, width, height],
  );

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
      width={width}
      height={height}
      className={`inline-block ${className}`}
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        // --- FIX 3: Force pixelated rendering in CSS ---
        // imageRendering: 'pixelated',
        imageRendering: "crisp-edges",
        // Alternatively, use: imageRendering: 'crisp-edges'
        // ------------------------------------------------
        backgroundColor: "transparent",
      }}
    />
  );
}
