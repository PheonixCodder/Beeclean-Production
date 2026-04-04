import { BlogStatus, Prisma } from "@prisma/client";
import DOMPurify from "isomorphic-dompurify";
import prisma from "../prisma";

export interface CreateBlogData {
  title: string;
  content: string;
  slug: string;
  excerpt?: string | null;
  description?: string | null;
  tags?: string[];
  thumbnail?: string | null;
  featured?: boolean;
  status?: BlogStatus;
  authorId: string;
  publishedAt?: Date | null;
}

export interface UpdateBlogData {
  id: string;
  title?: string;
  content?: string;
  slug?: string;
  excerpt?: string | null;
  description?: string | null;
  tags?: string[];
  thumbnail?: string | null;
  featured?: boolean;
  status?: BlogStatus;
  publishedAt?: Date | null;
}

export interface BlogWithRelations {
  id: string;
  title: string;
  slug: string;
  status: BlogStatus;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  author: { id: string; name: string; email: string } | null;
  _count: { categories: number };
}

export class BlogService {
  /**
   * Create a new blog post with proper validation and sanitization
   */
  static async createBlog(data: CreateBlogData): Promise<BlogWithRelations> {
    const {
      title,
      content,
      slug,
      excerpt,
      description,
      tags = [],
      thumbnail,
      featured,
      status = "draft",
      authorId,
      publishedAt,
    } = data;

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
      throw new Error(`Blog with slug "${slug}" already exists`);
    }

    // Create blog and categories in transaction
    const result = await prisma.$transaction(async (tx) => {
      const blog = await tx.blog.create({
        include: {
        author: true,
          categories: {
            include: {
              category: true,
            },
        },
      },
        data: {
          title,
          content: sanitizedContent,
          slug,
          excerpt,
          description: description || excerpt,
          thumbnail,
          featured,
          status,
          authorId,
          publishedAt:
            status === "published" && !publishedAt ? new Date() : publishedAt,
        },
      });

      // Create category associations
      if (tags.length > 0) {
        for (const tagName of tags) {
          const trimmedName = tagName.trim();
          if (!trimmedName) continue;

          const tagSlug = trimmedName.toLowerCase().replace(/\s+/g, "-");
          const category = await tx.category.upsert({
            where: { slug: tagSlug },
            update: {},
            create: {
              name: trimmedName,
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

    // Return formatted result
    return this.formatBlogResponse(result);
  }

  /**
   * Update an existing blog post
   */
  static async updateBlog(data: UpdateBlogData): Promise<BlogWithRelations> {
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
      publishedAt,
    } = data;

    // Find existing blog
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!existingBlog) {
      throw new Error("Blog not found");
    }

    // Check slug conflict if slug is being changed
    if (slug && slug !== existingBlog.slug) {
      const slugExists = await prisma.blog.findUnique({
        where: { slug },
      });

      if (slugExists) {
        throw new Error(`Blog with slug "${slug}" already exists`);
      }
    }

    // Sanitize content if provided
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

    // Update blog and categories in transaction
    const result = await prisma.$transaction(async (tx) => {
      const blog = await tx.blog.update({
        where: { id },
        include: {
          author: true,
          categories: {
            include: {
              category: true,
            },
          },
        },
        data: {
          ...(title && { title }),
          ...(sanitizedContent && { content: sanitizedContent }),
          ...(slug && { slug }),
          ...(excerpt !== undefined && { excerpt }),
          ...(description !== undefined && { description }),
          ...(thumbnail !== undefined && { thumbnail }),
          ...(featured !== undefined && { featured }),
          ...(status !== undefined && { status }),
          ...(publishedAt !== undefined && { publishedAt }),
        },
      });

      // Update categories if tags provided
      if (tags && tags.length > 0) {
        // Delete existing category associations
        await tx.blogCategory.deleteMany({
          where: { blogId: id },
        });

        // Create new category associations
        for (const tagName of tags) {
          const trimmedName = tagName.trim();
          if (!trimmedName) continue;

          const tagSlug = trimmedName.toLowerCase().replace(/\s+/g, "-");
          const category = await tx.category.upsert({
            where: { slug: tagSlug },
            update: {},
            create: {
              name: trimmedName,
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

    return this.formatBlogResponse(result);
  }

  /**
   * Delete a blog post
   */
  static async deleteBlog(id: string): Promise<void> {
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      throw new Error("Blog not found");
    }

    // Delete blog (cascade will handle blogCategory relations)
    await prisma.blog.delete({
      where: { id },
    });
  }

  /**
   * Get all blogs with author info (for admin)
   */
  static async getAllBlogs(): Promise<BlogWithRelations[]> {
    const blogs = await prisma.blog.findMany({
      include: {
        author: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return blogs.map(this.formatBlogResponse);
  }

  /**
   * Get published blogs for public viewing
   */
  static async getPublishedBlogs(tag?: string): Promise<BlogWithRelations[]> {
    const where: {
      status: BlogStatus;
      categories?: { some: { category: { slug: string } } };
    } = {
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

    return blogs.map(this.formatBlogResponse);
  }

  /**
   * Get a single blog by slug
   */
  static async getBlogBySlug(slug: string): Promise<BlogWithRelations | null> {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        author: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!blog) {
      return null;
    }

    return this.formatBlogResponse(blog);
  }

  /**
   * Format blog record to API response shape
   */
  private static formatBlogResponse(
    blog: Prisma.BlogGetPayload<{
      include: {
        author: true;
        categories: {
          include: {
            category: true;
          };
        };
      };
    }>,
  ): BlogWithRelations {
    return {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      status: blog.status,
      featured: blog.featured,
      publishedAt: blog.publishedAt?.toISOString() || null,
      createdAt: blog.createdAt.toISOString(),
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
    };
  }
}
