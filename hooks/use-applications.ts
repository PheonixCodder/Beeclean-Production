'use client';

import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
  createdAt: string;
  updatedAt: string;
}

const fetchApplications = async (): Promise<Application[]> => {
  const res = await fetch('/api/applications');
  if (!res.ok) {
    throw new Error('Failed to fetch applications');
  }
  return res.json();
};

export function useApplications() {
  const queryClient = useQueryClient();

  const {
    data: applications = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
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

  // Submit application mutation
  const submitMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return fetch('/api/applications', {
        method: 'POST',
        body: formData,
      }).then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({
            error: 'Failed to submit application',
          }));
          throw new Error(errorData.error || 'Failed to submit application');
        }
        return res.json();
      });
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
