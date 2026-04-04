"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BlogCard } from "@/components/blog/blog-card";

interface BlogData {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  thumbnail: string | null;
  publishedAt: string;
}

interface BlogWithMetadata extends BlogData {
  relevanceScore: number;
  date: Date;
}

interface ReadMoreSectionProps {
  currentSlug: string[];
  currentTags?: string[];
}

export function ReadMoreSection({
  currentSlug,
  currentTags = [],
}: ReadMoreSectionProps) {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data: BlogData[] = await res.json();

        const currentSlugValue = currentSlug[0];

        const otherPosts: BlogWithMetadata[] = data
          .filter((page) => page.slug !== currentSlugValue)
          .map((page) => {
            const tagOverlap = currentTags.filter((tag) =>
              page.tags?.includes(tag),
            ).length;

            return {
              ...page,
              relevanceScore: tagOverlap,
              date: new Date(page.publishedAt),
            };
          })
          .sort((a, b) => {
            if (a.relevanceScore !== b.relevanceScore) {
              return b.relevanceScore - a.relevanceScore;
            }
            return b.date.getTime() - a.date.getTime();
          })
          .slice(0, 3);

        setBlogs(otherPosts);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentSlug, currentTags]);

  if (loading) return null;
  if (blogs.length === 0) return null;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="border-t border-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-0">
        <motion.div
          className="flex flex-col gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-black tracking-tight text-gray-900"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          >
            Read more
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
            {blogs.map((post) => {
              const formattedDate = formatDate(new Date(post.publishedAt));

              return (
                <motion.div
                  key={post.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: "easeOut" },
                    },
                  }}
                >
                  <BlogCard
                    url={`/blogs/${post.slug}`}
                    title={post.title}
                    description={post.description}
                    date={formattedDate}
                    thumbnail={post.thumbnail || undefined}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
