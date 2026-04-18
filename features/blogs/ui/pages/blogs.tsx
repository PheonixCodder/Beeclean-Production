"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { TagFilter } from "@/features/blogs/ui/components/tag-filter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { BlogData } from "@/features/blogs/hooks/use-blogs";
import { cn } from "@/lib/utils";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { ArrowRight, Sparkles, Inbox, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Prism from "@/components/ui/background";
import { toast } from "sonner";

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
  const [selectedTag, setSelectedTag] = React.useState(initialTag);
  const [searchQuery, setSearchQuery] = React.useState(initialSearch);
  const [isPending, startTransition] = React.useTransition();
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    startTransition(async () => {
      const { subscribeNewsletter } = await import("@/app/actions/newsletter");
      const result = await subscribeNewsletter(email);
      if (result.success) {
        toast.success(result.message);
        setEmail("");
      } else {
        toast.error(result.message);
      }
    });
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesTag =
        selectedTag === "All" || blog.tags?.includes(selectedTag);
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [blogs, selectedTag, searchQuery]);

  const featuredPost = useMemo(
    () => filteredBlogs.find((b) => b.featured) || filteredBlogs[0],
    [filteredBlogs],
  );
  
  const regularPosts = useMemo(
    () => filteredBlogs.filter((b) => b.id !== featuredPost?.id),
    [filteredBlogs, featuredPost],
  );

  const [isPastFilter, setIsPastFilter] = React.useState(false);
const sentinelRef = React.useRef<HTMLDivElement | null>(null);

React.useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      // When sentinel leaves viewport → user scrolled past
      setIsPastFilter(!entry.isIntersecting);
    },
    {
      root: null,
      threshold: 0,
    }
  );

  if (sentinelRef.current) {
    observer.observe(sentinelRef.current);
  }

  return () => observer.disconnect();
}, []);

  return (
    <div className="min-h-screen font-satoshi selection:bg-zinc-900 selection:text-white">
      {/* 🏔️ CLEAN HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm mb-12"
            >
              <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                The Beeclean Journal
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-6xl font-black tracking-tight text-[#1a1a1a] mb-8 leading-[1.1]"
            >
              Blogs <br />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl font-semibold text-foreground/85 leading-relaxed mb-16 max-w-2xl"
            >
              Optimizing mobile performance & security through precision architectural deep-dives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-8 items-center"
            >
              <AppStoreButton size="lg" />
              <div className="h-10 w-px bg-zinc-100 hidden md:block" />
              <Link href="/blogs" className="group">
                  <span className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-3 group-hover:gap-5 transition-all">
                    Explore all stories
                    <ArrowRight className="w-4 h-4" />
                  </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

{/* 👇 SCROLL TRIGGER POINT */}
<div ref={sentinelRef} />

{/* 🧭 NAVIGATION & FILTERING */}
<section
  className={cn(
    "sticky top-16 z-30 py-6 px-6 transition-all duration-300",
isPastFilter
  ? "bg-white/70 backdrop-blur-xl border-b border-zinc-50 shadow-sm"
  : "bg-transparent"
  )}
>        <div className="max-w-7xl mx-auto">
          <TagFilter
            tags={allTags}
            selectedTag={selectedTag}
            tagCounts={tagCounts}
            onTagClick={setSelectedTag}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </section>

      {/* 📰 FEED CONTENT */}
      <main className="max-w-7xl mx-auto py-20 px-6">
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length > 0 ? (
              <motion.div layout className="space-y-24">
                {/* Featured Spotlight */}
                {featuredPost && !searchQuery && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                      <div className="relative aspect-[16/11] overflow-hidden rounded-[3rem] shadow-apple-hover p-4 bg-zinc-50 border border-zinc-100 group">
                        <div className="relative w-full h-full overflow-hidden rounded-[2.5rem]">
                            <Image
                            src={featuredPost.thumbnail || "/placeholder-blog.jpg"}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                            />
                        </div>
                        <div className="absolute top-10 left-10 bg-black text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl">
                          Premier Story
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                            {featuredPost.tags?.[0] || "Architecture"}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-zinc-100" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                            {featuredPost.readTime} min deep-dive
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-8 leading-tight group-hover:underline decoration-zinc-100 decoration-8 underline-offset-12 transition-all">
                          <Link href={`/blogs/${featuredPost.slug}`}>
                            {featuredPost.title}
                          </Link>
                        </h2>
                        <p className="text-muted-foreground text-lg font-medium leading-relaxed mb-10 line-clamp-3">
                          {featuredPost.description}
                        </p>
                        <div className="flex items-center gap-8">
                          <Link href={`/blogs/${featuredPost.slug}`}>
                            <Button className="h-20 px-12 rounded-[2rem] font-black bg-black text-white hover:bg-zinc-800 group/btn transition-all uppercase tracking-widest text-xs shadow-apple-hover">
                              Access dossier
                              <ArrowRight className="ml-4 w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Main Feed Grid */}
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                  {regularPosts.map((blog, idx) => (
                    <motion.div
                      key={blog.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                        <motion.article
                          whileHover={{ y: -6 }}
                          className="relative bg-white shadow-apple hover:shadow-apple-hover transition-all duration-500 flex flex-col h-full overflow-hidden rounded-[2.5rem] border border-zinc-100 p-2"
                        >
                          {/* ✨ IMAGE AREA */}
                          {blog.thumbnail && (
                            <div className="relative h-64 overflow-hidden bg-zinc-50 rounded-[2rem]">
                              <Image
                                src={blog.thumbnail}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-1000 ease-[0.16, 1, 0.3, 1] group-hover:scale-110"
                              />
                              
                              {/* Category Badge */}
                              <div className="absolute top-4 left-4 bg-black text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl z-10">
                                {blog.tags?.[0]}
                              </div>
                            </div>
                          )}

                          {/* ✨ CONTENT AREA */}
                          <div className="p-8 flex flex-col flex-grow">
                            <div className="flex items-center gap-3 mb-6">
                              {idx === 0 && (
                                <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-zinc-50 border border-zinc-100">
                                  <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-black">
                                      Trending
                                  </span>
                                </div>
                              )}
                              {blog.readTime && (
                                <span className="flex items-center gap-2 text-[10px] font-black text-zinc-300 uppercase tracking-widest">
                                  <Clock className="w-3.5 h-3.5" />
                                  {blog.readTime} MIN Deep-Dive
                                </span>
                              )}
                            </div>

                            <h3
                              className="font-satoshi font-black leading-tight tracking-[-0.03em] text-black mb-6 group-hover:text-zinc-600 transition-colors duration-500 text-2xl"
                            >
                              {blog.title}
                            </h3>

                            <p className="text-zinc-400 font-medium leading-tight line-clamp-2 mb-8 text-lg tracking-tight">
                              {blog.description}
                            </p>

                            <div className="mt-auto pt-8 border-t border-zinc-50 flex items-center justify-between">
                              {blog.author && (
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-10 h-10 rounded-2xl border border-zinc-100 shadow-sm">
                                    <AvatarImage src={blog.author.avatar || ""} className="object-cover" />
                                    <AvatarFallback className="bg-black text-white text-[10px] font-black">
                                      {blog.author.name?.[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black text-black uppercase tracking-widest">
                                      {blog.author.name}
                                    </span>
                                    <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">
                                      {new Date(blog.publishedAt || "").toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </div>
                                </div>
                              )}

                              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-50 group-hover:bg-black transition-all duration-500 shadow-sm group-hover:shadow-2xl">
                                <svg 
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  className="group-hover:text-white transition-colors text-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* 🎯 MID-FEED CONVERSION CTA */}
                {!searchQuery && filteredBlogs.length >= 3 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="relative bg-zinc-950 rounded-[2.5rem] p-12 md:p-20 overflow-hidden text-center"
                  >
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]" />
                    
                    <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-xl animate-subtle-float">
                        <img src="/logo.svg" alt="Bee" className="w-10 h-10" />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-6 leading-tight">
                        Unlock Your <span className="text-zinc-400 italic">Phone’s</span> Potential.
                      </h2>
                      <p className="text-zinc-400 text-lg font-medium mb-10">
                        Join 200k+ users who trust Beeclean for a clutter-free, high-performance iPhone experience.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <AppStoreButton size="lg" variant="white" />
                        <Link href="/#pricing" className="text-zinc-400 hover:text-white font-bold text-sm tracking-tight transition-colors">
                          View Pricing Plans
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-40 text-center"
              >
                <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Inbox className="w-10 h-10 text-zinc-200" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-black mb-4">
                  No matches found for "{searchQuery}"
                </h3>
                <p className="text-zinc-500 font-medium mb-10">
                  Try adjusting your filters or search keywords.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag("All");
                  }}
                  className="rounded-full bg-black text-white px-8 py-6 font-bold"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </main>

      {/* 📬 NEWSLETTER FOOTER CTA */}
      <section className="bg-white py-48 px-6 relative overflow-hidden">
         {/* Background Detail */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,_var(--zinc-50)_0%,,_transparent_70%)] opacity-70" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
             <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm mb-12">
              <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Weekly Insights
              </span>
            </div>
            
            <h2 className="text-5xl font-black tracking-tight text-black mb-10 leading-tight">
              Stay ahead <br />
              <span className="text-primary">of the curve.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground font-medium mb-16 max-w-2xl mx-auto">
              Join Beeclean for weekly architectural deep-dives into mobile performance and security.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-6 p-4 bg-zinc-50/50 backdrop-blur-xl rounded-[2.5rem] border border-zinc-100 max-w-2xl mx-auto shadow-apple-hover">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Secure email link"
                className="flex-1 px-8 py-5 text-lg font-black uppercase tracking-widest outline-none bg-transparent placeholder:text-zinc-300 disabled:opacity-50"
                required
                disabled={isPending}
              />
              <Button disabled={isPending} type="submit" className="h-20 rounded-2xl bg-black text-white px-12 font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-zinc-800 transition-all">
                {isPending ? "Joining..." : "Join Community"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
