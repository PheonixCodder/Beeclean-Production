"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Using a basic div for the bubble if shadcn is not ready,
// otherwise use your Card component
import { Card } from "@/components/ui/card";
import AnimatedBeeSadCanvas from "./animated-bee-sad-canvas";
import AnimatedBeeHappyHappyCanvas from "./animated-bee-happy-canvas";

export default function BeeMascotController() {
  const [status, setStatus] = useState<"idle" | "happy" | "sad" | "talking">(
    "idle",
  );

  // Triggered when user clicks the bee
  const handleBeeClick = () => {
    setStatus("happy");
    // Automatically reset to idle after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-10 select-none">
      {/* 1. "Ask Bee" Speech Bubble */}
      <AnimatePresence>
        {status === "talking" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -10 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute z-10 -top-12"
          >
            <Card className="px-4 py-2 shadow-2xl border-2 border-yellow-400 bg-white rounded-2xl relative">
              <p className="text-sm font-bold text-slate-800">
                Bzzzt! How can I help? 🐝
              </p>
              {/* Bubble Arrow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-yellow-400 rotate-45" />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Interactive Bee Container */}
      <motion.div
        animate={{ y: [0, -15, 0] }} // Constant hover floating effect
        transition={{
          y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        }}
        onMouseEnter={() => status === "idle" && setStatus("talking")}
        onMouseLeave={() => status === "talking" && setStatus("idle")}
        onClick={handleBeeClick}
        className="cursor-pointer transition-transform active:scale-95"
      >
        {/* Swapping Canvas Components based on state */}
        {status === "happy" || status === "talking" || status === "idle" ? (
          <AnimatedBeeHappyHappyCanvas
            width={300}
            height={300}
            className="drop-shadow-xl"
          />
        ) : (
          <AnimatedBeeSadCanvas
            width={300}
            height={300}
            className="drop-shadow-lg opacity-90 grayscale-[0.2]"
          />
        )}
      </motion.div>

      {/* 3. Manual Controls (For Testing) */}
      <div className="mt-10 flex gap-3">
        <button
          onClick={() => setStatus("sad")}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-[10px] uppercase tracking-wider font-bold"
        >
          Make Sad
        </button>
        <button
          onClick={() => setStatus("idle")}
          className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded text-[10px] uppercase tracking-wider font-bold"
        >
          Reset Bee
        </button>
      </div>
    </div>
  );
}
