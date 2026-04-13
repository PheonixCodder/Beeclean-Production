"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AppStoreButton } from "../ui/app-store-button";

const Hero = () => {
  return (
    <motion.div
      className="flex flex-col items-center bg-white relative z-20 pb-10 font-satoshi"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
        },
      }}
    >
      <motion.div
        className="flex flex-col items-center justify-center min-h-[400px] px-4 text-center"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        {/* Main Heading */}
        <motion.h1
          className="text-6xl md:text-6xl font-black tracking-tight text-[#1a1a1a] leading-[1.1]"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          Your{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-primary">storage</span>
            <span className="absolute inset-0 bg-primary/25 rounded-xl scale-110" />
          </span>
          <br />
          under control.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mt-8 max-w-lg font-semibold text-xl text-foreground/85 leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
        >
          Meet Bee, your personal cleaning assistant. Scan, organize, and remove
          clutter to keep your phone running at its best.
        </motion.p>
      </motion.div>
      <motion.div
        className="flex flex-col items-center relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      >
        <motion.img
          src={"/bee-store-2.png"}
          width={40}
          className="-mb-1.5 z-30"
        />
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <AppStoreButton />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
