'use client';

import { useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAdminBlogs, createBlog as createBlogAction, updateBlog as updateBlogAction, deleteBlog as deleteBlogAction } from '@/app/actions/blogs';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  status: string;
  featured: boolean;
  publishedAt: string | Date | null;
  createdAt: string | Date;
  author: { name: string } | null;
  _count: { categories: number };
}



export function useDashboardBlogs() {
  const queryClient = useQueryClient();

  const {
    data: blogs = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['dashboard-blogs'],
    queryFn: async () => {
      const data = await getAdminBlogs();
      return data as Blog[];
    },
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
      publishedAt?: string;
    }) => {
      // Pass the data directly into the server action
      return await createBlogAction(data);
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
      publishedAt?: string;
    }) => {
      return await updateBlogAction(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-blogs'] });
    },
  });

  // Delete blog mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteBlogAction(id);
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
