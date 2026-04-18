"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBeeCanvas from "../../../../components/canvas/animated-bee-canvas";

export const AskBeeSection = () => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  return (
    <section className="py-20 flex flex-col items-center bg-slate-50/50 rounded-3xl mx-4 my-10 border border-slate-100 relative overflow-hidden">
      {/* The Bee Interaction Area */}
      <div className="relative w-full max-w-2xl flex flex-col items-center">
        {/* Animated Bee Canvas (Reuse your existing component) */}
        <motion.div
          animate={
            isTyping
              ? {
                  scale: 1.1,
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }
              : {
                  y: [0, -15, 0],
                }
          }
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="mb-6 pointer-events-none"
        >
          <AnimatedBeeCanvas width={120} height={120} />
        </motion.div>

        {/* Floating Chat Bubble */}
        <AnimatePresence>
          {query.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-12 bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-100 text-sm font-medium"
            >
              "I'm ready to help you clean!" ✨
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Interactive Input */}
        <div className="relative w-full px-6">
          <input
            type="text"
            placeholder="Ask Bee to clean duplicates, organize photos..."
            className="w-full h-16 bg-white border-2 border-slate-100 rounded-2xl px-6 pt-1 text-lg font-satoshi outline-none focus:border-primary transition-colors shadow-sm"
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="absolute right-10 top-1/2 -translate-y-1/2 bg-black text-white px-5 py-2 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-transform">
            Ask
          </button>
        </div>
      </div>
    </section>
  );
};
