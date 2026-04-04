'use client';

import { useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface BlogData {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  thumbnail: string | null;
  publishedAt: string;
  readTime: string | null;
}

const fetchBlogs = async (): Promise<BlogData[]> => {
  const res = await fetch('/api/blogs');
  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return res.json();
};

export function useBlogs() {
  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  // Compute all tags with counts
  const { allTags, tagCounts } = useMemo(() => {
    const tagsSet = new Set<string>();
    const counts: Record<string, number> = { All: blogs.length };

    blogs.forEach((blog) => {
      blog.tags?.forEach((tag) => {
        tagsSet.add(tag);
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return {
      allTags: ['All', ...Array.from(tagsSet).sort()],
      tagCounts: counts,
    };
  }, [blogs]);

  // Function to get filtered blogs by tag
  const getFilteredBlogs = useCallback(
    (selectedTag: string): BlogData[] => {
      return selectedTag === 'All'
        ? blogs
        : blogs.filter((blog) => blog.tags?.includes(selectedTag));
    },
    [blogs]
  );

  return {
    blogs,
    allTags,
    tagCounts,
    isLoading,
    error,
    getFilteredBlogs,
  };
}
