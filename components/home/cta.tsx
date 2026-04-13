"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { AppStoreButton } from "@/components/ui/app-store-button";

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
    <div className={`relative w-[280px] md:w-[320px] aspect-[9/19] ${className}`}>
      {/* Frame Shadow */}
      <div className="absolute inset-0 z-0 bg-white/5 blur-3xl scale-90 translate-y-10 rounded-[3rem]" />
      
      {/* The Physical Frame PNG */}
      <img
        src="/frame.png"
        alt="Frame"
        className="absolute inset-0 z-30 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
      />
      {/* The Screen Content */}
      <div className="absolute inset-0 z-10 w-full h-[97%] mt-3 rounded-[2.8rem] overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-[91.5%] h-full mt-0 ml-[16px] rounded-[2.8rem] object-cover"
        />
      </div>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-transparent px-6 py-24 md:px-12 lg:px-24 flex items-center"
    >
      <div className="mx-auto w-full max-w-6/7 rounded-[3.5rem] bg-white border border-zinc-100 p-12 md:p-24 overflow-hidden relative shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]">
        {/* Background Accent Glow (Subtle) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 items-center gap-24 lg:grid-cols-2 relative z-10">
          {/* Left Side */}
          <div className="z-40 flex flex-col items-center space-y-12 text-center lg:items-start lg:text-left font-satoshi">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Ready to clean?</span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-[-0.03em] text-black"
              >
                Start <span className="text-zinc-500 italic">fresh.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="max-w-lg text-lg md:text-xl font-medium leading-tight tracking-tight text-zinc-500"
              >
                The most powerful way to declutter your library. Find duplicates,
                large videos, and blurry shots in a single tap.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-zinc-100/50 rounded-[2rem] blur-xl opacity-0 hover:opacity-100 transition-opacity" />
              <AppStoreButton size="lg" />
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-6 text-center lg:text-left">Join 200,000+ optimized users</p>
            </motion.div>
          </div>

          {/* Right Side: Mockups */}
          <div className="relative flex h-[500px] w-full items-center justify-center lg:h-[600px]">
            {/* Decorative radial behind phones */}
            <div className="absolute w-[500px] h-[500px] bg-zinc-50 rounded-full blur-[100px] opacity-70" />

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
            <motion.div className="relative z-30 scale-110 drop-shadow-2xl">
              <PhoneFrame src="/front.png" alt="Main app screen" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
