import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import DOMPurify from "isomorphic-dompurify";

type BlogWithRelations = {
  id: string;
  title: string;
  slug: string;
  status: string;
  featured: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  author: { id: string; name: string; email: string } | null;
  _count: { categories: number };
};

// Helper function to check admin role
const isAdmin = (user: { role?: string | null }): boolean => {
  return user.role === "admin";
};

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isAdmin(session.user)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const blogs = await prisma.blog.findMany({
      include: {
        author: true,
        categories: true,
      },
    });

    const formattedBlogs: BlogWithRelations[] = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      status: blog.status,
      featured: blog.featured,
      publishedAt: blog.publishedAt,
      createdAt: blog.createdAt,
      author: blog.author
        ? {
            id: blog.author.id,
            name: blog.author.name,
            email: blog.author.email,
          }
        : null,
      _count: {
        categories: blog.categories.length,
      },
    }));

    return NextResponse.json(formattedBlogs);
  } catch (error) {
    console.error("Error fetching admin blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isAdmin(session.user)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      content,
      slug,
      excerpt,
      description,
      tags,
      thumbnail,
      featured = false,
      status = "draft",
    } = body;

    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, slug" },
        { status: 400 },
      );
    }

    // Sanitize HTML content to prevent XSS
    const sanitizedContent = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        "p",
        "strong",
        "em",
        "ul",
        "ol",
        "li",
        "h1",
        "h2",
        "h3",
        "a",
        "code",
        "pre",
        "img",
        "br",
        "span",
        "div",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id"],
    });

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: `Blog with slug "${slug}" already exists` },
        { status: 409 },
      );
    }

    // Handle tags/categories (create or find existing)
    let categoryObjs: any[] = [];
    if (tags && Array.isArray(tags)) {
      for (const tagName of tags) {
        const trimmedName = tagName.trim();
        if (!trimmedName) continue;

        let category = await prisma.category.findUnique({
          where: { slug: trimmedName.toLowerCase().replace(/\s+/g, "-") },
        });

        if (!category) {
          category = await prisma.category.create({
            data: {
              name: trimmedName,
              slug: trimmedName.toLowerCase().replace(/\s+/g, "-"),
            },
          });
        }

        categoryObjs.push({ categoryId: category.id });
      }
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content: sanitizedContent,
        slug,
        excerpt: excerpt || null,
        description: description || null,
        thumbnail: thumbnail || null,
        featured,
        status,
        authorId: session.user.id,
        categories: {
          create: categoryObjs,
        },
        publishedAt: status === "published" ? new Date() : null,
      },
    });

    // Fetch the created blog with author info
    const createdBlog = await prisma.blog.findUnique({
      where: { id: blog.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (createdBlog) {
      const formattedBlog: BlogWithRelations = {
        id: createdBlog.id,
        title: createdBlog.title,
        slug: createdBlog.slug,
        status: createdBlog.status,
        featured: createdBlog.featured,
        publishedAt: createdBlog.publishedAt || null,
        createdAt: createdBlog.createdAt,
        author: createdBlog.author ? createdBlog.author : null,
        _count: {
          categories: createdBlog.categories.length,
        },
      };
      return NextResponse.json(formattedBlog, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isAdmin(session.user)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const {
      id,
      title,
      content,
      slug,
      excerpt,
      description,
      tags,
      thumbnail,
      featured,
      status,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
    }

    // Sanitize HTML content if provided
    let sanitizedContent = content;
    if (content) {
      sanitizedContent = DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [
          "p",
          "strong",
          "em",
          "ul",
          "ol",
          "li",
          "h1",
          "h2",
          "h3",
          "a",
          "code",
          "pre",
          "img",
          "br",
          "span",
          "div",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id"],
      });
    }

    // Find existing blog
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Check slug conflict if slug is being changed
    if (slug && slug !== existingBlog.slug) {
      const slugExists = await prisma.blog.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: `Blog with slug "${slug}" already exists` },
          { status: 409 },
        );
      }
    }

    // Update categories if tags provided
    if (tags && Array.isArray(tags)) {
      // Delete existing categories
      await prisma.blogCategory.deleteMany({
        where: { blogId: id },
      });

      // Create new categories
      for (const tagName of tags) {
        const trimmedName = tagName.trim();
        if (!trimmedName) continue;

        let category = await prisma.category.findUnique({
          where: { slug: trimmedName.toLowerCase().replace(/\s+/g, "-") },
        });

        if (!category) {
          category = await prisma.category.create({
            data: {
              name: trimmedName,
              slug: trimmedName.toLowerCase().replace(/\s+/g, "-"),
            },
          });
        }

        await prisma.blogCategory.create({
          data: {
            blogId: id,
            categoryId: category.id,
          },
        });
      }
    }

    // Update the blog
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title: title ?? existingBlog.title,
        content: sanitizedContent ?? existingBlog.content,
        slug: slug ?? existingBlog.slug,
        excerpt: excerpt ?? existingBlog.excerpt,
        description: description ?? existingBlog.description,
        thumbnail: thumbnail ?? existingBlog.thumbnail,
        featured: featured ?? existingBlog.featured,
        status: status ?? existingBlog.status,
        publishedAt:
          status === "published" && existingBlog.status !== "published"
            ? new Date()
            : existingBlog.publishedAt,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isAdmin(session.user)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
    }

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Delete blog categories first
    await prisma.blogCategory.deleteMany({
      where: { blogId: id },
    });

    // Delete the blog
    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
