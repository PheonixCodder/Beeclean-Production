'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { MobileTableOfContents } from '@/components/blog/mobile-toc';
import { AuthorCard } from '@/components/blog/author-card';
import { ReadMoreSection } from '@/components/blog/read-more-section';
import { PromoContent } from '@/components/blog/promo-content';
import { HashScrollHandler } from '@/components/ui/hash-scroll-handler';
import { notFound } from 'next/navigation';
import { ConvertToMarkdown } from '@/lib/convert-to-markdown';
import { use } from 'react';
import { motion } from 'framer-motion';
import { useBlogPost } from '@/hooks/use-blog-post';
import DOMPurify from 'isomorphic-dompurify';

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { blog, isLoading, error } = useBlogPost(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    notFound();
  }

  return (
    <motion.div
      className="min-h-screen bg-white font-satoshi"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
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
      <HashScrollHandler />

      {/* Header Section */}
      <div className="flex flex-col pt-30 pb-12 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
          <motion.div
            className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: 'easeOut' },
              },
            }}
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
            <span className="text-gray-300">|</span>
            <time>{formatDate(new Date(blog.publishedAt))}</time>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.1]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' },
              },
            }}
          >
            {blog.title}
          </motion.h1>

          {blog.description && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: 'easeOut' },
                },
              }}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl font-medium">
                {blog.description}
              </p>
            </motion.div>
          )}

          <motion.div
            className="flex flex-wrap items-center gap-3 pt-2"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: 'easeOut' },
              },
            }}
          >
            {blog.tags && blog.tags.length > 0 &&
              blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
          {/* Main Column */}
          <div className="min-w-0">
            {blog.thumbnail && (
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-apple mb-12"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: 'easeOut' },
                  },
                }}
              >
                <div className="relative h-[400px] w-full">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            )}

            <motion.article
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-balance prose-p:tracking-tight prose-a:no-underline prose-a:text-primary hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-img:rounded-2xl prose-img:shadow-apple"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: 'easeOut' },
                },
              }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
            />

            <motion.div
              className="mt-20"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: 'easeOut' },
                },
              }}
            >
              <ReadMoreSection currentSlug={[slug]} currentTags={blog.tags} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {blog.author && (
                <AuthorCard
                  author={{
                    name: blog.author.name,
                    position: 'Author',
                    avatar: blog.author.image || '/default-avatar.png',
                  }}
                />
              )}
              <TableOfContents />
              <PromoContent variant="desktop" />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile TOC */}
      <MobileTableOfContents />
    </motion.div>
  );
}
