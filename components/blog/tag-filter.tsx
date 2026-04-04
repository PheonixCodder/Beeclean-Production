"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "../ui/dialog";

interface BlogData {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  thumbnail: string | null;
  publishedAt: string;
  readTime: string | null;
}

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  tagCounts?: Record<string, number>;
  onTagClick: (tag: string) => void;
  blogs?: BlogData[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function TagFilter({
  tags,
  selectedTag,
  tagCounts,
  onTagClick,
  searchQuery = "",
  onSearchChange,
}: TagFilterProps) {
  // Sync internal state with external prop (for when filters are cleared)
  const [localValue, setLocalValue] = useState(searchQuery);

  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (val: string) => {
    setLocalValue(val);
    onSearchChange?.(val);
  };

  const commonInput = (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
        <Search className="w-4 h-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        placeholder="Search articles..."
        value={localValue}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-full pl-10 pr-20 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-gray-900 placeholder:text-gray-400"
      />
      {localValue && (
        <button
          type="button"
          onClick={() => handleInputChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-3.5 h-3.5 text-gray-400" />
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTagClick(tag)}
              className={`h-10 flex items-center px-4 rounded-xl cursor-pointer transition-all duration-200 shadow-apple hover:shadow-apple-hover ${
                selectedTag === tag
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-white text-foreground/85 hover:-translate-y-0.5"
              }`}
            >
              <span className="font-medium text-sm">{tag}</span>
              {tagCounts?.[tag] && (
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-md font-bold ${
                    selectedTag === tag
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tagCounts[tag]}
                </span>
              )}
            </motion.button>
          ))}
        </div>
        {commonInput}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-apple hover:shadow-apple-hover transition-all">
            <span className="capitalize text-sm font-bold text-foreground/85">
              {selectedTag}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DrawerTrigger>

          <DrawerContent>
            <DialogTitle className="hidden"></DialogTitle>
            <DrawerHeader>
              <h3 className="font-bold text-xl text-foreground font-satoshi tracking-tight">
                Filter Articles
              </h3>
            </DrawerHeader>
            <div className="px-4 pb-8 space-y-4">
              {commonInput}
              <div className="space-y-2">
                {tags.map((tag) => (
                  <motion.button
                    key={tag}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onTagClick(tag)}
                    className={`w-full flex items-center justify-between font-medium cursor-pointer text-sm p-4 rounded-xl transition-all ${
                      selectedTag === tag
                        ? "bg-[#1a1a1a] text-white shadow-apple"
                        : "bg-white text-foreground/85 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-medium">{tag}</span>
                    {tagCounts?.[tag] && (
                      <span
                        className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                          selectedTag === tag
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tagCounts[tag]}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
