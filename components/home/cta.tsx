"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function PhotoCleanupHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const leftPhoneX = useTransform(smoothProgress, [0, 1], [0, -240]);
  const leftPhoneRotate = useTransform(smoothProgress, [0, 1], [0, -12]);

  const rightPhoneX = useTransform(smoothProgress, [0, 1], [0, 240]);
  const rightPhoneRotate = useTransform(smoothProgress, [0, 1], [0, 12]);

  // Reusable Phone Frame Component
  const PhoneFrame = ({
    src,
    alt,
    className = "",
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <div className={`relative w-[260px] aspect-[9/18.5] ${className}`}>
      {/* The Physical Frame PNG */}
      <img
        src="/frame.png"
        alt="Frame"
        className="absolute inset-0 z-20 w-full h-full object-contain pointer-events-none"
      />
      {/* The Screen Content */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 z-10 w-[91%] h-[97%] mt-[6px] ml-[12px] rounded-[2.5rem] object-cover"
      />
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background px-6 py-24 md:px-12 lg:px-24 flex items-center"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">
        {/* Left Side */}
        <div className="z-40 flex flex-col items-center space-y-8 text-center lg:items-start lg:text-left">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-satoshi text-5xl font-black leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              Start organizing <br />
              <span className="text-primary">your photos.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-md font-inter text-lg leading-relaxed text-muted-foreground"
            >
              The most powerful way to declutter your library. Find duplicates,
              large videos, and blurry shots in a single tap.
            </motion.p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="h-16 px-10 relative z-50 flex items-center gap-3 rounded-2xl bg-black text-white hover:bg-zinc-800 transition-all text-lg font-bold shadow-2xl">
              <img
                src="/apple.svg"
                width={24}
                alt="apple"
                className="brightness-0 invert"
              />
              Download on App Store
            </Button>
          </motion.div>
        </div>

        {/* Right Side: Mockups */}
        <div className="relative flex h-[600px] w-full items-center justify-center lg:h-[700px]">
          {/* Left Phone */}
          <motion.div
            style={{ x: leftPhoneX, rotate: leftPhoneRotate }}
            className="absolute z-10"
          >
            <PhoneFrame src="/hero-3.png" alt="Similar photos" />
          </motion.div>

          {/* Right Phone */}
          <motion.div
            style={{ x: rightPhoneX, rotate: rightPhoneRotate }}
            className="absolute z-10"
          >
            <PhoneFrame src="/hero-2.png" alt="Cleanup UI" />
          </motion.div>

          {/* Center Phone */}
          <motion.div className="relative z-30 scale-110">
            <PhoneFrame src="/front.png" alt="Main app screen" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
