"use client"; // Required for Next.js app directory to use hooks

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Apple } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle state based on scroll position
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
      <motion.div
        className="flex items-center justify-between max-w-7xl font-inter mx-auto px-8 py-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {/* Left Section: Logo */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
          }}
        >
          <Link href="/" className="flex items-center leading-tighter gap-2">
            <img src="/logo.svg" alt="logo" width={32} />
            <span className="text-[15px] font-semibold tracking-tighter">
              Beeclean
            </span>
          </Link>
        </motion.div>

        {/* Center Section: Navigation Links */}
        <motion.div
          className="hidden md:flex tracking-tighter items-center gap-8 font-inter text-[12px] font-semibold"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {[
            { label: "How it Works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
            { label: "Testimonials", href: "#testimonials" },
            { label: "Blogs", href: "/blogs" },
          ].map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <Link
                href={link.href}
                className="text-foreground/85 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Section: CTA Button */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 10 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
          }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className="py-4.5 px-4 relative z-50 flex items-center rounded-xl cursor-pointer bg-[#1a1a1a] text-white hover:bg-black shadow-apple hover:shadow-apple-hover transition-all duration-200 hover:-translate-y-0.5 active:scale-95 text-[13px] font-bold tracking-tight">
              <img src="/apple.svg" width={20} alt="apple" className="mb-1" />
              Download for iPhone
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
