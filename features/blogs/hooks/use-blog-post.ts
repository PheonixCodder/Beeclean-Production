'use client';

import { useQuery } from '@tanstack/react-query';
import { getBlogPost } from '@/app/actions/blogs';

export interface BlogPost {
  title: string;
  description: string;
  excerpt?: string;
  publishedAt: string | Date | null;
  author?: {
    name: string;
    image: string;
    position?: string | null;
    bio?: string | null;
  };
  tags: string[];
  thumbnail?: string | null;
  content: string;
  readTime?: string | null;
}



export function useBlogPost(slug: string) {
  const {
    data: blog = null,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      const data = await getBlogPost(slug);
      return data as BlogPost;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 404
      if (error instanceof Error && error.message === 'Not found') {
        return false;
      }
      return failureCount < 1;
    },
    enabled: !!slug && slug.length > 0,
  });

  return {
    blog,
    isLoading,
    error,
  };
}
