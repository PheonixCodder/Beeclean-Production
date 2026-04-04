"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useQueryState } from "nuqs";
import { BlogCard } from "@/components/blog/blog-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { Button } from "@/components/ui/button";
import { BlogData } from "@/hooks/use-blogs";

const ALL_TAGS = "All";

interface BlogsPageClientProps {
  blogs: BlogData[];
  allTags: string[];
  tagCounts: Record<string, number>;
  initialTag: string;
  initialSearch: string;
}

export default function BlogsPageClient({
  blogs,
  allTags,
  tagCounts,
  initialTag,
  initialSearch,
}: BlogsPageClientProps) {
  // 1. URL State Management
  const [tagParam, setTagParam] = useQueryState("tag", { shallow: true });
  const [searchParam, setSearchParam] = useQueryState("search", {
    shallow: true,
    history: "replace", // Prevents clogging browser history while typing
  });

  const selectedTag = tagParam || initialTag;
  const searchQuery = searchParam || initialSearch;

  // 2. TRUE Local State: This stays purely in the input until debounced
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // 3. Debounce Effect: Updates the URL (and thus the filtered list)
  // only after 400ms of inactivity.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchQuery !== searchParam) {
        setSearchParam(localSearchQuery.trim() || null);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearchQuery, setSearchParam, searchParam]);

  // 4. Sync: If URL is cleared externally, update the local input
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const getFilteredBlogs = useCallback(
    (selectedTag: string): BlogData[] => {
      return selectedTag === ALL_TAGS
        ? blogs
        : blogs.filter((blog) => blog.tags?.includes(selectedTag));
    },
    [blogs]
  );

  const filteredBlogs = useMemo(() => {
    let filtered = getFilteredBlogs(selectedTag);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [blogs, selectedTag, searchQuery, getFilteredBlogs]);

  const handleTagClick = (tag: string) => {
    setTagParam(tag === ALL_TAGS ? null : tag);
  };

  const clearAllFilters = () => {
    setTagParam(null);
    setSearchParam(null);
    setLocalSearchQuery(""); // Clear local input immediately
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="pt-16 pb-12 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900">
              BeeClean Blog
            </h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
              Latest news and updates. Discover tips and insights.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
              onTagClick={handleTagClick}
              blogs={getFilteredBlogs(selectedTag)}
              searchQuery={localSearchQuery}
              onSearchChange={setLocalSearchQuery}
            />
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredBlogs.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-lg text-gray-600 mb-2">
              {searchQuery
                ? `No articles found matching "${searchQuery}"`
                : `No articles found for "${selectedTag}"`}
            </p>
            <Button onClick={clearAllFilters} variant="link" className="mt-2">
              Clear all filters
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredBlogs.map((blog) => (
              <motion.div key={blog.id} variants={itemVariants}>
                <BlogCard
                  url={`/blogs/${blog.slug}`}
                  title={blog.title}
                  description={blog.description}
                  date={new Date(blog.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  thumbnail={blog.thumbnail || undefined}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
