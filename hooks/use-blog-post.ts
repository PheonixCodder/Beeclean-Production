'use client';

import { useQuery } from '@tanstack/react-query';

export interface BlogPost {
  title: string;
  description: string;
  excerpt?: string;
  publishedAt: string;
  author?: { name: string; image: string };
  tags: string[];
  thumbnail: string;
  content: string;
}

const fetchBlogPost = async (slug: string): Promise<BlogPost> => {
  const res = await fetch(`/api/blogs/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Not found');
    }
    throw new Error('Failed to fetch blog post');
  }

  return res.json();
};

export function useBlogPost(slug: string) {
  const {
    data: blog = null,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => fetchBlogPost(slug),
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
