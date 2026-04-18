"use client";

import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
  const [localValue, setLocalValue] = useState(searchQuery);

  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (val: string) => {
    setLocalValue(val);
    onSearchChange?.(val);
  };

  return (
    <div className="space-y-6 flex items-center justify-between">
      {/* 🔍 SEARCH BAR - Clean Apple Aesthetic */}
      <div className="relative group min-w-2xl">
        <div className="relative flex items-center bg-zinc-50/80 backdrop-blur-sm border border-zinc-200 focus-within:border-black rounded-full transition-all duration-300 px-6 py-2">
          <Search className="w-5 h-5 text-zinc-400" />
          
          <input
            type="text"
            placeholder="Search blogs..."
            value={localValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1 px-4 py-3 text-[15px] font-medium outline-none bg-transparent text-black placeholder:text-zinc-400"
          />
          
          {localValue && (
            <button
              onClick={() => handleInputChange("")}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-zinc-500" />
            </button>
          )}
        </div>
      </div>

      {/* 🏷️ TAG RAIL - Clean Pill Style */}
      <div className="relative">
        <div className="overflow-x-auto no-scrollbar pb-2">
          <div className="flex gap-2 min-w-max">
            {tags.map((tag) => {
              const active = selectedTag === tag;

              return (
                <motion.button
                  key={tag}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onTagClick(tag)}
                  className={cn(
                    "px-5 h-10 flex items-center gap-2 text-[13px] font-semibold rounded-full transition-all duration-200",
                    active
                      ? "bg-black text-white shadow-sm"
                      : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-100",
                  )}
                >
                  {tag}

                  {tagCounts?.[tag] && (
                    <span
                      className={cn(
                        "text-[11px] px-1.5 py-0.5 rounded-full",
                        active
                          ? "bg-white/20 text-white"
                          : "bg-zinc-200/50 text-zinc-400",
                      )}
                    >
                      {tagCounts[tag]}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
