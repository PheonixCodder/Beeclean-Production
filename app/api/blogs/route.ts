import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/ratelimit";

// Helper function to check admin role
const isAdmin = (user: { role?: string | null }): boolean => {
  return user.role === "admin";
};

// GET handler - already defined above, need to combine
export async function GET(request: NextRequest) {
  try {
    // Rate limiting - extract IP address
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const isAllowed = await checkRateLimit(ip, "public");
    if (!isAllowed) {
      const headers = await getRateLimitHeaders(ip, "public");
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const tag = searchParams.get("tag");

    const where: Prisma.BlogWhereInput = {
      status: "published",
    };

    if (tag && tag !== "All") {
      where.categories = {
        some: {
          category: {
            slug: tag,
          },
        },
      };
    }

    const blogs = await prisma.blog.findMany({
      where,
      include: {
        author: true,
        categories: {
          include: {
            category: true
          }
        }
      },
    });

    const formattedBlogs = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      description: blog.description || blog.excerpt || "",
      content: blog.content,
      slug: blog.slug,
      status: blog.status,
      publishedAt:
        blog.publishedAt?.toISOString() || blog.createdAt.toISOString(),
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
      author: blog.author
        ? {
            id: blog.author.id,
            name: blog.author.name,
            email: blog.author.email,
            image: blog.author.image,
            position: blog.author.position,
            bio: blog.author.bio,
          }
        : null,
      tags: blog.categories.map((bc) => bc.category.name),
      categorySlugs: blog.categories.map((bc) => bc.category.slug),
      excerpt: blog.excerpt,
      featured: blog.featured,
      readTime: blog.readTime,
      thumbnail: blog.thumbnail,
    }));

    return NextResponse.json(formattedBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

// POST handler - create new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin role
    if (!isAdmin(session.user)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      content,
      excerpt,
      description,
      slug,
      status = "draft",
      featured = false,
      readTime,
      thumbnail,
      publishedAt,
      authorId,
      tags = [],
    } = body;

    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: "Title, content, and slug are required" },
        { status: 400 },
      );
    }

    // Use session user as author if no authorId provided
    const finalAuthorId = authorId || session.user.id;

    // Create blog and handle categories in transaction
    const result = await prisma.$transaction(async (tx) => {
      const blog = await tx.blog.create({
        data: {
          title,
          content,
          excerpt,
          description: description || excerpt,
          slug,
          status,
          featured,
          readTime,
          thumbnail,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
          authorId: finalAuthorId,
        },
      });

      // Create category associations
      if (tags.length > 0) {
        // Get or create categories
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

          // Create blog-category relation
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

    return NextResponse.json(
      { message: "Blog created successfully", blog: result },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 },
    );
  }
}
