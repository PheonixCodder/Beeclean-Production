'use client';

import { useMemo, useCallback } from 'react';
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
  resumeUrl?: string | null;
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

export function useDashboardApplications() {
  const queryClient = useQueryClient();

  const {
    data: applications = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['dashboard-applications'],
    queryFn: fetchApplications,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  // Compute application statistics
  const stats = useMemo(() => {
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

    return counts;
  }, [applications]);

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch('/api/applications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          error: 'Failed to update status',
        }));
        throw new Error(errorData.error || 'Failed to update status');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-applications'] });
    },
  });

  // Delete application mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/applications?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          error: 'Failed to delete application',
        }));
        throw new Error(errorData.error || 'Failed to delete application');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-applications'] });
    },
  });

  return {
    applications,
    isLoading,
    error,
    stats,
    updateStatus: updateStatusMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,
    updateStatusError: updateStatusMutation.error,
    deleteApplication: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
    refetchApplications: refetch,
  };
}
