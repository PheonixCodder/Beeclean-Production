import { BlogData } from "@/hooks/use-blogs";
import prisma from "@/lib/prisma";
import BlogsPageClient from "./client";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Prism from "@/components/ui/background";

interface PageProps {
  searchParams: Promise<{ tag?: string; search?: string }>;
}

// Force dynamic rendering - nuqs/useQueryState uses useSearchParams internally
export const dynamic = 'force-dynamic';

export default async function BlogsPage({ searchParams }: PageProps) {
  // Fetch all published blogs on the server
  const blogs = await prisma.blog.findMany({
    where: { status: "published" },
    include: {
      author: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: [
      { featured: "desc" }, // Featured first
      { publishedAt: "desc" }, // Then by date
    ],
  });

  // Transform to BlogData format
  const allBlogs: BlogData[] = (blogs as any[]).map((blog) => ({
    id: blog.id,
    title: blog.title,
    description: blog.description || blog.excerpt || "",
    slug: blog.slug,
    tags: blog.categories.map((bc: any) => bc.category.name),
    thumbnail: blog.thumbnail,
    publishedAt: blog.publishedAt?.toISOString() || blog.createdAt.toISOString(),
    readTime: blog.readTime,
    // Include author info (name + avatar optional from User)
    author: blog.author ? {
      name: blog.author.name,
      avatar: blog.author.image || "/default-avatar.png",
    } : undefined,
    // Include featured flag from DB
    featured: blog.featured || false,
  }));

  // Compute all tags with counts
  const tagsSet = new Set<string>();
  const tagCounts: Record<string, number> = { All: allBlogs.length };

  allBlogs.forEach((blog) => {
    blog.tags?.forEach((tag) => {
      tagsSet.add(tag);
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const allTags = ["All", ...Array.from(tagsSet).sort()];

  // Get initial filter values from URL
  const params = await searchParams;
  const initialTag = params.tag || "All";
  const initialSearch = params.search || "";

  return (
    <Suspense fallback={<BlogsPageSkeleton />}>
      <div className="fixed inset-0 -z-10 pointer-events-none">
              <Prism
                animationType="rotate"
                timeScale={0.3}
                height={3.5}
                baseWidth={5.5}
                scale={3.6}
                hueShift={0}
                colorFrequency={1}
                noise={0}
                glow={0.8}
              />
            </div>
      <BlogsPageClient
        blogs={allBlogs}
        allTags={allTags}
        tagCounts={tagCounts}
        initialTag={initialTag}
        initialSearch={initialSearch}
      />
    </Suspense>
  );
}

function BlogsPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <section className="bg-warm-ivory pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-6">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-24" />
              <div className="w-8 h-[1px] bg-mistral-orange/30" />
            </div>
            <Skeleton className="h-24 w-3/4 max-w-2xl" />
            <Skeleton className="h-8 w-1/2 max-w-xl" />
          </div>
          <Skeleton className="h-14 w-56" />
        </div>
      </section>

      {/* Filter skeleton */}
      <section className="bg-warm-ivory/50 border-y border-sunshine-700/10 py-8">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <Skeleton className="h-10 w-full max-w-md" />
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-9 w-20" />
            ))}
          </div>
        </div>
      </section>

      {/* Cards skeleton */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-8 w-40 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
