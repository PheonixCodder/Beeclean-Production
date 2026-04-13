"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AppStoreButton } from "../ui/app-store-button";
import { Zap, ShieldCheck, Check, Star, Users } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const avatarStack = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
];

export default function NewHero() {
  return (
    <section className="relative min-h-screen bg-transparent flex items-center overflow-hidden font-satoshi selection:bg-black/5">
      <div className="min-w-6/7 mt-20 bg-white border border-zinc-100 p-12 rounded-[3.5rem] mx-auto">
      <div className="px-6 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          {/* Left Section: Content & Conversion */}
          <motion.div
            className="flex-1 space-y-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Announcement Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-zinc-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]"
              variants={itemVariants}
            >
              <div className="flex -space-x-2">
                {avatarStack.map((url, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border-2 border-white overflow-hidden"
                  >
                    <img
                      src={url}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="w-[1px] h-3 bg-zinc-200" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                4.9/5 Rating by 12k Users
              </span>
            </motion.div>

            <motion.div className="relative" variants={itemVariants}>
              {/* Floating Mascot with Reactive Shadow */}
              <motion.div
                className="absolute -top-20 -left-16 w-28 h-28 z-20 pointer-events-none"
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Simulated Mascot Shadow on "Canvas" */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/5 rounded-full blur-sm"
                  animate={{
                    scale: [1, 0.8, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <h1 className="text-6xl gap-5 flex md:text-9xl font-black tracking-tight text-black/80 leading-[1.05]">
                Meet
                <span className="italic relative z-50">
                  Bee.
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.5C41.3333 2.16667 122.5 -2.5 199 6.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </span>
                <img
                  src="/bee-right.png"
                  className="w-[200px] absolute ml-107 -mt-15 drop-shadow-2xl z-50"
                />
              </h1>
            </motion.div>

            <motion.p
              className="font-semibold text-xl text-zinc-700 leading-relaxed max-w-xl"
              variants={itemVariants}
            >
              The definitive utility for storage hygiene. Effortlessly scan,
              classify, and declutter to keep your device as fast as day one.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-6 pt-4"
              variants={itemVariants}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-zinc-200 rounded-[2.2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <AppStoreButton size="xl" />
              </div>

              <button className="h-16 px-10 rounded-2xl bg-white border border-zinc-200 text-black shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300 font-black uppercase tracking-widest text-[10px] flex items-center gap-3 group">
                Watch System Tour
                <div className="w-7 h-7 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all">
                  <Zap size={10} className="fill-current" />
                </div>
              </button>
            </motion.div>

            {/* Micro Trust Stats */}
            <motion.div
              className="flex items-center gap-12 pt-10 border-t border-zinc-100 w-fit"
              variants={itemVariants}
            >
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  <ShieldCheck size={12} className="text-zinc-500" /> Security
                </p>
                <p className="text-xl font-black text-black">AES-256</p>
              </div>
              <div className="w-[1px] h-10 bg-zinc-200/50" />
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  <Users size={12} className="text-zinc-500" /> Community
                </p>
                <p className="text-xl font-black text-black">1.4M+</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section: High-Fidelity App Preview */}
          <motion.div
            className="flex-1 relative w-full max-w-xl"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ambient Pulse Background */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] animate-pulse" />

            {/* Phone Frame Construction */}
            <div className="relative z-10 mx-auto rotate-6 w-[330px] lg:w-[400px] aspect-[9/19]">
              <img
                src="/frame.png"
                alt="frame"
                className="absolute inset-0 z-30 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
              />

              {/* 2. The Active Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-10 w-full h-[97%] mt-3 rounded-[2.8rem] overflow-hidden"
                >
                  <img
                    src={"/hero-3.png"}
                    className="w-[91.5%] h-full mt-0 ml-[16px] rounded-[2.8rem] object-cover"
                    alt="Feature Screenshot"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Enhanced Floating Status Components */}
              <motion.div
                className="absolute -left-16 top-1/3 z-30 group"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="bg-white/80 backdrop-blur-2xl border border-white p-5 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-transform hover:scale-110">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-500 flex items-center justify-center text-white">
                      <Zap size={22} className="fill-primary text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">
                        Performance
                      </p>
                      <p className="text-sm font-black text-black">
                        98% Optimized
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-16 bottom-1/4 z-30 group"
                animate={{ y: [0, 20, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <div className="bg-zinc-950/95 backdrop-blur-2xl p-5 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] transition-transform hover:scale-110 border border-zinc-800/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center">
                      <Check className="text-primary" size={22} />
                    </div>
                    <div className="text-white">
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-0.5">
                        Analysis Done
                      </p>
                      <p className="text-sm font-black">2.4GB Recovered</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-zinc-400"
      >
        <img src="/scroll.svg" className="w-10 h-auto opacity-50 my-10" alt="Scroll" />
      </motion.div>
    </section>
  );
}
