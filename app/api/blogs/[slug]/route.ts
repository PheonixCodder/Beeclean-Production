import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { checkRateLimit, getRateLimitHeaders } from '@/lib/ratelimit';

// Helper function to check admin role
const isAdmin = (user: { role?: string | null }): boolean => {
  return user.role === "admin";
};

// Type definitions
interface BlogCategoryInfo {
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

interface BlogWithRelations {
  id: string;
  title: string;
  content: string;
  description: string | null;
  excerpt: string | null;
  slug: string;
  status: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    position: string | null;
    bio: string | null;
  } | null;
  categories: BlogCategoryInfo[];
  thumbnail: string | null;
  readTime: string | null;
  featured: boolean;
}

interface BlogResponse {
  id: string;
  title: string;
  content: string;
  description: string;
  excerpt: string;
  slug: string;
  status: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: { id: string; name: string; email: string; image?: string | null; position?: string | null; bio?: string | null } | null;
  tags: string[];
  categorySlugs: string[];
  thumbnail: string | null;
  readTime: string | null;
  featured: boolean;
}

// GET handler - fetch a single published blog by slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Rate limiting - extract IP address
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const isAllowed = await checkRateLimit(ip, 'public');
    if (!isAllowed) {
      const headers = await getRateLimitHeaders(ip, 'public');
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers }
      );
    }

    const { slug } = await params;

    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            position: true,
            bio: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    }) as BlogWithRelations | null;

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    // Public GET only returns published blogs
    if (blog.status !== "published") {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    const formattedBlog = {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      description: blog.description || blog.excerpt || "",
      excerpt: blog.excerpt || "",
      slug: blog.slug,
      status: blog.status,
      publishedAt: blog.publishedAt?.toISOString() || blog.createdAt.toISOString(),
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
      author: blog.author ? {
        id: blog.author.id,
        name: blog.author.name,
        email: blog.author.email,
        image: blog.author.image,
        position: blog.author.position,
        bio: blog.author.bio,
      } : null,
      tags: blog.categories.map((bc) => bc.category.name),
      categorySlugs: blog.categories.map((bc) => bc.category.slug),
      thumbnail: blog.thumbnail,
      readTime: blog.readTime,
      featured: blog.featured,
    };

    return NextResponse.json(formattedBlog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// PUT handler - update blog (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check admin role
    if (!isAdmin(session.user)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const { slug } = await params;
    const body = await request.json();
    const {
      title,
      content,
      excerpt,
      description,
      status,
      featured,
      readTime,
      thumbnail,
      publishedAt,
      tags = [],
    } = body;

    // Find existing blog
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    // Update blog and categories in transaction
    const result = await prisma.$transaction(async (tx) => {
      const blog = await tx.blog.update({
        where: { id: existingBlog.id },
        data: {
          title,
          content,
          excerpt,
          description: description || excerpt,
          status,
          featured,
          readTime,
          thumbnail,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
        },
      });

      // Remove existing category associations
      await tx.blogCategory.deleteMany({
        where: { blogId: existingBlog.id },
      });

      // Create new category associations
      if (tags.length > 0) {
        for (const tagName of tags) {
          const tagSlug = tagName.toLowerCase().replace(/\s+/g, "-");
          const category = await tx.category.upsert({
            where: { slug: tagSlug },
            update: {},
            create: {
              name: tagName,
              slug: tagSlug,
            },
          });

          await tx.blogCategory.create({
            data: {
              blogId: blog.id,
              categoryId: category.id,
            },
          });
        }
      }

      return blog;
    });

    return NextResponse.json({
      message: "Blog updated successfully",
      blog: result,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE handler - delete blog (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check admin role
    if (!isAdmin(session.user)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const { slug } = await params;

    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    // Delete blog (cascade will handle blogCategory relations)
    await prisma.blog.delete({
      where: { id: blog.id },
    });

    return NextResponse.json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
