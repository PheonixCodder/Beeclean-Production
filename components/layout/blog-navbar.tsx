"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-gray-200 bg-white/75 backdrop-blur-md"
          : "border-transparent bg-white/0"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-8 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="flex items-center leading-tighter gap-2">
            <img src="/logo.svg" alt="logo" width={32} />
            <span className="text-[15px] font-semibold tracking-tighter">
              Beeclean
            </span>
          </Link>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: 10 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
          }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="py-4.5 px-4 relative z-50 flex items-center rounded-xl cursor-pointer bg-[#1a1a1a] text-white hover:bg-black shadow-apple hover:shadow-apple-hover transition-all duration-200 hover:-translate-y-0.5 active:scale-95 text-[13px] font-bold tracking-tight">
              <img src="/apple.svg" width={20} alt="apple" className="mb-1" />
              Download for iPhone
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
