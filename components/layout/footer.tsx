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
      className="relative w-full bg-[#f4f4f4] pt-20 pb-6 px-8 font-satoshi overflow-hidden border-t border-gray-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Top Content Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm relative z-20"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          {/* Branding Section */}
          <div className="flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img src="/logo.svg" alt="logo" width={32} />
            </div>
            <h2 className="font-semibold text-xl text-gray-900 mt-2">
              Beeclean
            </h2>
            <p className="text-gray-500">Your storage under control</p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-gray-400 font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              {footerLinks.Links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`${
                      link.label === "Home"
                        ? "text-yellow-500"
                        : "text-gray-900"
                    } font-medium hover:opacity-70 transition-opacity`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-gray-400 font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              {footerLinks.Connect.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-900 font-medium hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Massive Logo with aggressive space reduction */}
        <motion.div
          className="flex justify-center -my-20 md:-my-50 relative z-10 pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Link
            href="/"
            className="relative block w-full max-w-7xl h-48 md:h-250! pointer-events-auto"
          >
            <Image
              src="/logo-footer.png"
              alt="Beeclean Footer Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </motion.div>

        {/* Bottom Legal Row */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-4 relative z-20 text-[10px] md:text-xs text-gray-400">
          <p>© 2026 Beeclean. All rights reserved.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link href="/terms-conditions" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
