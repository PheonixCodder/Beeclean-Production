"use client";

import { List } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";
import { motion } from "framer-motion";
import { TableOfContents } from "@/components/blog/table-of-contents";

export function MobileTableOfContents() {
  return (
    <Drawer>
      <DrawerTrigger className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#1a1a1a] text-white p-4 rounded-full shadow-apple hover:shadow-apple-hover transition-all">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <List size={24} />
        </motion.div>
      </DrawerTrigger>

      <DrawerContent className="lg:hidden bg-white">
        <DrawerHeader className="text-left">
          <h3 className="font-bold text-xl text-gray-900 font-satoshi tracking-tight">
            Table of Contents
          </h3>
        </DrawerHeader>

        <div className="px-4 pb-8">
          <TableOfContents />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
