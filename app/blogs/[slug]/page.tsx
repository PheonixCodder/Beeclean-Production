import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { BlogPost } from "@/features/blogs/hooks/use-blog-post";
import BlogPostClient from "@/features/blogs/ui/pages/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const blogData = await prisma.blog.findUnique({
    where: { slug },
    include: {
      author: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  }) as any;

  const blog: BlogPost = {
    title: blogData.title,
    description: blogData.description || blogData.excerpt || "",
    excerpt: blogData.excerpt || undefined,
    publishedAt: blogData.publishedAt?.toISOString() || blogData.createdAt.toISOString(),
    author: blogData.author
      ? {
          name: blogData.author.name,
          image: blogData.author.image || "/default-avatar.png",
          position: blogData.author.position || undefined,
          bio: blogData.author.bio || undefined,
        }
      : undefined,
    tags: blogData.categories.map((bc: any) => bc.category.name),
    thumbnail: blogData.thumbnail || undefined,
    content: blogData.content,
    readTime: blogData.readTime || undefined,
  };

  return <BlogPostClient blog={blog} slug={slug} />;
}
