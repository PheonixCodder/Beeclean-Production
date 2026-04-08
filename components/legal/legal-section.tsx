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
      className="space-y-5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-black font-satoshi tracking-tight text-gray-900">
        {number !== undefined && `${number}. `}
        {heading}
      </h2>
      <div className="text-base font-inter text-gray-500 leading-relaxed space-y-4">
        {children}
      </div>
    </motion.section>
  );
}
