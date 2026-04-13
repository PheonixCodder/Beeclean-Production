"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />
      
      {/* Background Polish */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60%] bg-[radial-gradient(circle_at_center,_var(--zinc-50)_0%,_transparent_70%)] opacity-70" />
      </div>

      <motion.main
        className="flex-1 py-40 px-6 lg:px-0 relative z-10 font-satoshi"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
          },
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <motion.div
            className="text-left mb-32"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm mb-12">
               <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Legal Documentation</span>
            </div>

            <h1 className="text-6xl md:text-6xl font-black tracking-tight text-[#1a1a1a] mb-10 leading-[1.1]">
              {title}
            </h1>
            
            <div className="flex items-center gap-6">
               <div className="h-[1px] flex-1 bg-zinc-100" />
               <p className="shrink-0 text-[10px] text-zinc-300 font-black uppercase tracking-widest">
                Last updated • {lastUpdated}
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-32"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {children}
          </motion.div>

          {/* Back to Home Link */}
          <motion.div
            className="mt-40 pt-16 border-t border-zinc-100"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-4 text-zinc-400 hover:text-black font-black uppercase tracking-widest text-[10px] transition-all duration-300 group"
            >
              <div className="p-2 rounded-full border border-zinc-100 group-hover:border-black transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:-translate-x-1"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </div>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}
