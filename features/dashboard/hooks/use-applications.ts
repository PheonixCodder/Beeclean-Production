'use client';

import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApplications, submitApplication } from '@/app/actions/applications';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone?: string | null;
  linkedin?: string | null;
  message?: string | null;
  resume?: {
    name: string;
    type: string;
    size: number;
  } | null;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}



export function useApplications() {
  const queryClient = useQueryClient();

  const {
    data: applications = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const data = await getApplications();
      return data as Application[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  // Compute application statistics
  const { stats } = useMemo(() => {
    const counts = {
      total: applications.length,
      pending: 0,
      reviewed: 0,
      accepted: 0,
      rejected: 0,
    };

    applications.forEach((app) => {
      const status = app.status as keyof typeof counts;
      if (status in counts) {
        counts[status]++;
      }
    });

    return { stats: counts };
  }, [applications]);

  const submitMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await submitApplication(formData);
    },
    onSuccess: () => {
      // Invalidate and refetch applications list
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });

  return {
    applications,
    isLoading,
    error,
    stats,
    submitApplication: submitMutation.mutate,
    isSubmitting: submitMutation.isPending,
    submitSuccess: submitMutation.isSuccess,
    submitError: submitMutation.error,
    refetchApplications: refetch,
  };
}
