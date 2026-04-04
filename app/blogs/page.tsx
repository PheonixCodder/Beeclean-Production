"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useQueryState } from "nuqs";
import { BlogCard } from "@/components/blog/blog-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { Button } from "@/components/ui/button";
import { useBlogs } from "@/hooks/use-blogs";

const ALL_TAGS = "All";

export default function BlogsPage() {
  // 1. URL State Management
  const [tagParam, setTagParam] = useQueryState("tag", { shallow: true });
  const [searchParam, setSearchParam] = useQueryState("search", {
    shallow: true,
    history: "replace", // Prevents clogging browser history while typing
  });

  const selectedTag = tagParam || ALL_TAGS;
  const searchQuery = searchParam || "";

  // 2. TRUE Local State: This stays purely in the input until debounced
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const { allTags, tagCounts, getFilteredBlogs, isLoading, error } = useBlogs();

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

  const filteredBlogs = useMemo(() => {
    let blogs = getFilteredBlogs(selectedTag);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      blogs = blogs.filter((blog) => blog.title.toLowerCase().includes(query));
    }
    return blogs;
  }, [getFilteredBlogs, selectedTag, searchQuery]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-muted-foreground mb-4">
          {error instanceof Error ? error.message : "Failed to load blogs"}
        </p>
        <Button onClick={() => window.location.reload()}>Try again</Button>
      </div>
    );
  }

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
              searchQuery={localSearchQuery} // CRITICAL: Use local state here
              onSearchChange={setLocalSearchQuery} // CRITICAL: Update local state directly
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
