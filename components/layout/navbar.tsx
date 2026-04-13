"use client"; // Required for Next.js app directory to use hooks

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Apple } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { AppStoreButton } from "../ui/app-store-button";

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
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-gray-200 bg-white/75 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <motion.div
        className="flex bg-transparent items-center justify-between max-w-7xl font-inter mx-auto px-8 py-4"
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
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
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
                className="text-foreground/80 hover:text-black transition-colors"
                onClick={(e) => {
                  // For hash links on home page, handle smooth scroll
                  if (link.href.startsWith('#') && window.location.pathname === '/') {
                    e.preventDefault();
                    const element = document.getElementById(link.href.slice(1));
                    if (element) {
                      const offset = 80;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - offset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }
                  // For hash links from other pages, redirect to home page then scroll
                  else if (link.href.startsWith('#') && window.location.pathname !== '/') {
                    e.preventDefault();
                    // Store the target hash for scrolling after redirect
                    sessionStorage.setItem('scrollToHash', link.href.slice(1));
                    // Redirect to home page
                    window.location.href = '/';
                  }
                }}
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
          <AppStoreButton size="md" />
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
