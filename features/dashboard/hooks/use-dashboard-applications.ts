'use client';

import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApplications, updateApplicationStatus, deleteApplication as deleteApplicationAction } from '@/app/actions/applications';
import { ApplicationStatus } from '@prisma/client';

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
  createdAt: string | Date;
  updatedAt: string | Date;
}



export function useDashboardApplications() {
  const queryClient = useQueryClient();

  const {
    data: applications = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['dashboard-applications'],
    queryFn: async () => {
      const data = await getApplications();
      return data as Application[];
    },
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
      return await updateApplicationStatus(id, status as ApplicationStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-applications'] });
    },
  });

  // Delete application mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteApplicationAction(id);
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
