import { BlogData } from "@/hooks/use-blogs";
import prisma from "@/lib/prisma";
import BlogsPageClient from "./client";

interface PageProps {
  searchParams: Promise<{ tag?: string; search?: string }>;
}

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
    orderBy: { publishedAt: "desc" },
  });
  console.log(blogs)


  // Transform to BlogData format
  // Using type assertion to avoid Prisma type inference issues in this file
  const allBlogs: BlogData[] = (blogs as any[]).map((blog) => ({
    id: blog.id,
    title: blog.title,
    description: blog.description || blog.excerpt || "",
    slug: blog.slug,
    tags: blog.categories.map((bc: any) => bc.category.name),
    thumbnail: blog.thumbnail,
    publishedAt: blog.publishedAt?.toISOString() || blog.createdAt.toISOString(),
    readTime: blog.readTime,
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
    <BlogsPageClient
      blogs={allBlogs}
      allTags={allTags}
      tagCounts={tagCounts}
      initialTag={initialTag}
      initialSearch={initialSearch}
    />
  );
}
