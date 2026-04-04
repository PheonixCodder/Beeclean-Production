'use client';

import { useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  status: string;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  author: { name: string } | null;
  _count: { categories: number };
}

const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await fetch('/api/blogs/admin');
  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return res.json();
};

export function useDashboardBlogs() {
  const queryClient = useQueryClient();

  const {
    data: blogs = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['dashboard-blogs'],
    queryFn: fetchBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  // Compute status counts and all tags
  const { statusCounts, allTags } = useMemo(() => {
    const statusCounts = {
      total: blogs.length,
      draft: 0,
      published: 0,
    };

    const tagsSet = new Set<string>();

    blogs.forEach((blog) => {
      const status = blog.status as keyof typeof statusCounts;
      if (status in statusCounts) {
        statusCounts[status]++;
      }
      // Tags would need to be fetched separately; for now we'll return empty
    });

    return {
      statusCounts,
      allTags: ['All'], // Placeholder - would fetch from categories API
    };
  }, [blogs]);

  // Get filtered blogs by status
  const getFilteredBlogs = useCallback(
    (selectedStatus: string): Blog[] => {
      return selectedStatus === 'All'
        ? blogs
        : blogs.filter((blog) => blog.status === selectedStatus);
    },
    [blogs]
  );

  // Create blog mutation
  const createMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      slug: string;
      excerpt?: string;
      description?: string;
      tags?: string[];
      thumbnail?: string;
      featured?: boolean;
      status?: string;
    }) => {
      const res = await fetch('/api/blogs/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          error: 'Failed to create blog',
        }));
        throw new Error(errorData.error || 'Failed to create blog');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-blogs'] });
    },
  });

  // Update blog mutation
  const updateMutation = useMutation({
    mutationFn: async (data: {
      id: string;
      title?: string;
      content?: string;
      slug?: string;
      excerpt?: string;
      description?: string;
      tags?: string[];
      thumbnail?: string;
      featured?: boolean;
      status?: string;
    }) => {
      const res = await fetch('/api/blogs/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          error: 'Failed to update blog',
        }));
        throw new Error(errorData.error || 'Failed to update blog');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-blogs'] });
    },
  });

  // Delete blog mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/blogs/admin?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          error: 'Failed to delete blog',
        }));
        throw new Error(errorData.error || 'Failed to delete blog');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-blogs'] });
    },
  });

  return {
    blogs,
    isLoading,
    error,
    statusCounts,
    allTags,
    getFilteredBlogs,
    createBlog: createMutation.mutate,
    updateBlog: updateMutation.mutate,
    deleteBlog: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    refetchBlogs: refetch,
  };
}
