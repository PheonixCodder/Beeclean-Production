"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const footerLinks = {
    Links: [
      { label: "Home", href: "/" },
      { label: "Download", href: "/download" },
      { label: "Stories", href: "/blogs" },
      { label: "Blogs", href: "/blogs" },
      { label: "Pricing", href: "#pricing" },
    ],
    Connect: [
      { label: "Instagram", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Contact", href: "#" },
    ],
  };

  return (
    <motion.footer
      className="relative w-full bg-white pt-24 pb-12 px-8 font-satoshi overflow-hidden border-t border-gray-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
        },
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-sm"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        {/* Branding Section */}
        <motion.div
          className="flex flex-col gap-2"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delay: 0.1, duration: 0.5 },
            },
          }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <img src="/logo.svg" alt="logo" width={32} />
          </div>
          <h2 className="font-semibold text-xl text-gray-900 mt-2">Beeclean</h2>
          <p className="text-gray-500">Your storage under control</p>
          <div className="mt-auto pt-8">
            <p className="text-gray-400 text-xs">© 2026 Beeclean</p>
            <p className="text-gray-400 text-xs text-nowrap">
              All rights reserved
            </p>
          </div>
        </motion.div>

        {/* Links Column */}
        <motion.div
          className="md:pb-25"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delay: 0.2, duration: 0.5 },
            },
          }}
        >
          <h3 className="text-gray-400 font-semibold mb-4">Links</h3>
          <ul className="space-y-3">
            {footerLinks.Links.map((link) => (
              <motion.li
                key={link.label}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  className={` ${
                    link.label === "Home" ? "text-yellow-500" : "text-gray-900"
                  } font-medium hover:opacity-70 transition-opacity`}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Connect Column */}
        <motion.div
          className="relative"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.5 },
            },
          }}
        >
          <h3 className="text-gray-400 font-semibold mb-4">Connect</h3>
          <ul className="space-y-3">
            {footerLinks.Connect.map((link) => (
              <motion.li
                key={link.label}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  className="text-gray-900 font-medium hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
          {/* Secondary Links (Bottom Right) */}
          <div className="absolute bottom-0 right-0 flex gap-4 text-xs text-gray-400">
            <Link href="#" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Center Icon - Adjusted for half-visibility */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -bottom-6 flex justify-center"
        initial={{ scale: 0, rotate: -15 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
      >
        <div className="w-24 h-24 relative">
          <Image src="/icon.svg" alt="icon" fill className="object-contain" />
        </div>
      </motion.div>
    </motion.footer>
  );
}
