"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/ratelimit";
import { Prisma } from "@prisma/client";

const isAdmin = (user: { role?: string | null }): boolean => {
  return user.role === "admin";
};

// GET handler - fetch all published blogs
export async function getBlogs(tag?: string) {
  try {
    const reqHeaders = await headers();
    const ip =
      reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      reqHeaders.get("x-real-ip") ||
      "unknown";

    const isAllowed = await checkRateLimit(ip, "public");
    if (!isAllowed) {
      throw new Error("Too many requests. Please try again later.");
    }

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
            category: true,
          },
        },
      },
    });

    return blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      description: blog.description || blog.excerpt || "",
      content: blog.content,
      slug: blog.slug,
      status: blog.status,
      publishedAt: blog.publishedAt,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      author: blog.author
        ? {
            id: blog.author.id,
            name: blog.author.name,
            email: blog.author.email,
            avatar: blog.author.image || '', // Ensure hook compatibility
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
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}

// GET handler - fetch all blogs (admin only)
export async function getAdminBlogs() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session || !session.user || !isAdmin(session.user)) {
    throw new Error("Unauthorized");
  }

  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: { name: true },
        },
        _count: {
          select: { categories: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return blogs;
  } catch (error) {
    console.error("Error fetching admin blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}

// GET handler - fetch a single published blog by slug
export async function getBlogPost(slug: string) {
  try {
    const reqHeaders = await headers();
    const ip =
      reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      reqHeaders.get("x-real-ip") ||
      "unknown";

    const isAllowed = await checkRateLimit(ip, "public");
    if (!isAllowed) {
      throw new Error("Too many requests. Please try again later.");
    }

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
    });

    if (!blog || blog.status !== "published") {
      throw new Error("Not found");
    }

    return {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      description: blog.description || blog.excerpt || "",
      excerpt: blog.excerpt || "",
      slug: blog.slug,
      status: blog.status,
      publishedAt: blog.publishedAt,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
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
  } catch (error) {
    if (error instanceof Error && error.message === "Not found") {
      throw error;
    }
    console.error("Error fetching blog:", error);
    throw new Error("Failed to fetch blog");
  }
}

// POST handler - create new blog (admin only)
export async function createBlog(body: any) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session || !session.user || !isAdmin(session.user)) {
    throw new Error("Unauthorized");
  }

  try {
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
      throw new Error("Title, content, and slug are required");
    }

    const finalAuthorId = authorId || session.user.id;

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

      if (tags.length > 0) {
        for (const tagName of tags) {
          const tagSlug = tagName.toLowerCase().replace(/\s+/g, "-");
          const category = await tx.category.upsert({
            where: { slug: tagSlug },
            update: {},
            create: { name: tagName, slug: tagSlug },
          });

          await tx.blogCategory.create({
            data: { blogId: blog.id, categoryId: category.id },
          });
        }
      }

      return blog;
    });

    return result;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Failed to create blog");
  }
}

// PUT handler - update blog (admin only)
export async function updateBlog(data: any) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session || !session.user || !isAdmin(session.user)) {
    throw new Error("Unauthorized");
  }

  try {
    const {
      id,
      slug,
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
    } = data;

    const existingBlog = await prisma.blog.findUnique({
      where: slug ? { slug } : { id },
    });

    if (!existingBlog) {
      throw new Error("Blog not found");
    }

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
          publishedAt: publishedAt !== undefined ? (publishedAt ? new Date(publishedAt) : null) : undefined,
        },
      });

      if (tags.length > 0) {
        await tx.blogCategory.deleteMany({
          where: { blogId: existingBlog.id },
        });

        for (const tagName of tags) {
          const tagSlug = tagName.toLowerCase().replace(/\s+/g, "-");
          const category = await tx.category.upsert({
            where: { slug: tagSlug },
            update: {},
            create: { name: tagName, slug: tagSlug },
          });

          await tx.blogCategory.create({
            data: { blogId: blog.id, categoryId: category.id },
          });
        }
      }

      return blog;
    });

    return result;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw new Error("Failed to update blog");
  }
}

// DELETE handler - delete blog (admin only)
export async function deleteBlog(id: string) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session || !session.user || !isAdmin(session.user)) {
    throw new Error("Unauthorized");
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new Error("Blog not found");
    }

    await prisma.blog.delete({
      where: { id: blog.id },
    });

    return { message: "Blog deleted successfully" };
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw new Error("Failed to delete blog");
  }
}
