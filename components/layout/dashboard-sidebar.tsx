"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Settings,
  LogOut,
  Mail,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";


const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/blogs", label: "Blogs", icon: FileText },
  { href: "/dashboard/career", label: "Jobs", icon: Briefcase },
  { href: "/dashboard/applications", label: "Applications", icon: Users },
  { href: "/dashboard/newsletter", label: "Newsletter", icon: Mail },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut();
};

  return (
    <motion.aside
      className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-zinc-100 bg-white font-satoshi"
      initial={{ x: -256, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex h-full flex-col px-4">
        {/* Logo */}
        <div className="flex h-24 items-center px-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-black transition-transform group-hover:scale-110">
              <img src="/logo.svg" alt="logo" width={24} height={24} className="invert brightness-0 invert" />
            </div>
            <span className="text-2xl font-black tracking-[-0.05em] text-black">
              Beeclean
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-8 space-y-1">
          <p className="px-4 text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-4">Main Menu</p>
          {navItems.map((item, index) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 rounded-2xl px-4 py-4 text-[13px] font-black uppercase tracking-widest transition-all duration-300 group ${
                    isActive
                      ? "bg-white text-black shadow-apple-hover border border-zinc-100"
                      : "text-zinc-400 hover:text-black hover:bg-zinc-50"
                  }`}
                >
                  <item.icon className={`h-5 w-5 transition-colors ${isActive ? "text-black" : "text-zinc-300 group-hover:text-black"}`} strokeWidth={isActive ? 2.5 : 2} />
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto border-t border-zinc-50 py-8 space-y-1">
          <p className="px-4 text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-4">Account</p>
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-4 rounded-2xl px-4 py-4 text-[13px] font-black uppercase tracking-widest transition-all duration-300 ${
              pathname === "/dashboard/settings"
                ? "bg-white text-black shadow-apple-hover border border-zinc-100"
                : "text-zinc-400 hover:text-black hover:bg-zinc-50"
            }`}
          >
            <Settings className="h-5 w-5 text-zinc-300 group-hover:text-black" strokeWidth={2} />
            Settings
          </Link>
          <div
          onClick={handleLogout}
            className="flex items-center gap-4 rounded-2xl px-4 py-4 text-[13px] font-black uppercase tracking-widest text-zinc-300 transition-all hover:bg-zinc-50 hover:text-black group"
          >
            <div className="p-1 rounded-full bg-zinc-50 group-hover:bg-black transition-colors">
              <LogOut className="h-4 w-4 text-zinc-300 group-hover:text-white" strokeWidth={2.5} />
            </div>
            Sign Out
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
