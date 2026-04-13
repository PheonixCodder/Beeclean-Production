"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const footerLinks = {
    Company: [
      { label: "Home", href: "/" },
      { label: "Download", href: "/download" },
      { label: "Careers", href: "/career" },
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
    Legal: [
      { label: "Terms & Conditions", href: "/terms-conditions" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  return (
    <motion.footer
      className="relative w-full bg-black pt-24 pb-12 px-8 font-satoshi overflow-hidden border-t border-zinc-900"
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
  className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 text-sm relative z-20 mb-20"
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }}
>
  {/* Branding Section */}
  <div className="flex flex-col gap-3 col-span-2 lg:col-span-1">
    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2.5 shadow-apple-shadow">
      <img src="/logo.svg" alt="logo" className="w-full h-full object-contain" />
    </div>
    <h2 className="font-black text-2xl text-white mt-2 tracking-tighter">
      Beeclean
    </h2>
    <p className="text-zinc-500 font-medium text-base tracking-tight leading-snug max-w-[200px]">
      Professional iPhone storage optimization.
    </p>
  </div>

  {/* Company Column */}
  <div>
    <h3 className="text-white font-black uppercase text-[10px] tracking-widest mb-6 opacity-40">Company</h3>
    <ul className="space-y-4">
      {footerLinks.Company.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-zinc-400 font-bold hover:text-white hover:underline transition-all text-[15px] tracking-tight"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>

  {/* Connect Column */}
  <div>
    <h3 className="text-white font-black uppercase text-[10px] tracking-widest mb-6 opacity-40">Connect</h3>
    <ul className="space-y-4">
      {footerLinks.Connect.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-zinc-400 font-bold hover:text-white hover:underline transition-all text-[15px] tracking-tight"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>

  {/* Legal Column */}
  <div>
    <h3 className="text-white font-black uppercase text-[10px] tracking-widest mb-6 opacity-40">Legal</h3>
    <ul className="space-y-4">
      {footerLinks.Legal.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-zinc-400 font-bold hover:text-white hover:underline transition-all text-[15px] tracking-tight"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
</motion.div>

        {/* Massive Logo */}
        <motion.div
          className="flex justify-center relative z-10 pointer-events-none opacity-50 mix-blend-lighten"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="relative block w-full max-w-7xl h-48 md:h-120 pointer-events-auto">
            <Image
              src="/logo-footer.png"
              alt="Beeclean Footer Logo"
              fill
              className="object-contain invert brightness-200"
              priority
            />
          </div>
        </motion.div>

        {/* Bottom Legal Row */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-zinc-900 pt-8 relative z-20 text-[10px] md:text-xs font-bold tracking-widest uppercase text-zinc-600">
          <p>© 2026 Beeclean. Engineered for iOS.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Built with precision</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
