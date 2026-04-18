"use client";
import React from "react";
import { motion } from "framer-motion";

interface LegalSectionProps {
  heading: string;
  number?: number;
  children: React.ReactNode;
}

export default function LegalSection({
  heading,
  number,
  children,
}: LegalSectionProps) {
  return (
    <motion.section
      className="group space-y-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-baseline gap-6">
        {number !== undefined && (
          <span className="text-xl font-black text-zinc-300 tracking-tighter shrink-0 transition-colors group-hover:text-black">
            {number < 10 ? `0${number}` : number}
          </span>
        )}
        <h2 className="text-4xl md:text-5xl font-black font-satoshi tracking-[-0.03em] text-black leading-none">
          {heading}
        </h2>
      </div>
      
      <div className="text-xl font-medium text-zinc-500 leading-snug tracking-tight space-y-6 max-w-3xl">
        {children}
      </div>
    </motion.section>
  );
}
