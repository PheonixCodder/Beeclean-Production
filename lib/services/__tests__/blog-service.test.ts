import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BlogService } from '../blog-service';

// Mock Prisma client
vi.mock('@/lib/prisma', () => ({
  prisma: {
    blog: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    category: {
      upsert: vi.fn(),
    },
    blogCategory: {
      create: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

describe('BlogService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getBlogBySlug', () => {
    it('should return null when blog not found', async () => {
      const { prisma } = await import('@/lib/prisma');
      vi.mocked(prisma.blog.findUnique).mockResolvedValue(null);

      const result = await BlogService.getBlogBySlug('non-existent');
      expect(result).toBeNull();
    });

    it('should format blog correctly when found', async () => {
      const { prisma } = await import('@/lib/prisma');
      const mockBlog = {
        id: '1',
        title: 'Test Blog',
        content: 'Content',
        slug: 'test-blog',
        status: 'published' as const,
        featured: false,
        readTime: null,
        thumbnail: null,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: 'user1',
        author: {
          id: 'user1',
          name: 'Test Author',
          email: 'test@example.com',
        },
        categories: [
          {
            category: {
              id: 'cat1',
              name: 'Tech',
              slug: 'tech',
            },
          },
        ],
      };

      vi.mocked(prisma.blog.findUnique).mockResolvedValue(mockBlog);

      const result = await BlogService.getBlogBySlug('test-blog');

      expect(result).not.toBeNull();
      expect(result?.id).toBe('1');
      expect(result?.title).toBe('Test Blog');
      expect(result?.status).toBe('published');
      expect(result?.author?.name).toBe('Test Author');
      expect(result?._count.categories).toBe(1);
    });
  });

  describe('formatBlogResponse', () => {
    it('should handle null author', async () => {
      const { prisma } = await import('@/lib/prisma');
      const mockBlog = {
        id: '1',
        title: 'Test',
        content: 'Content',
        slug: 'test',
        status: 'draft' as const,
        featured: false,
        publishedAt: null,
        createdAt: new Date(),
        authorId: 'user1',
        author: null,
        categories: [],
      };

      vi.mocked(prisma.blog.findUnique).mockResolvedValue(mockBlog);

      const result = await BlogService.getBlogBySlug('test');
      expect(result?.author).toBeNull();
    });
  });
});
