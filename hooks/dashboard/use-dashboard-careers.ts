'use client';

import { useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

const fetchCareers = async (): Promise<Career[]> => {
  // For admin, fetch all jobs including drafts
  const res = await fetch('/api/careers');
  if (!res.ok) {
    throw new Error('Failed to fetch careers');
  }
  return res.json();
};

export function useDashboardCareers() {
  const queryClient = useQueryClient();

  const {
    data: careers = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['dashboard-careers'],
    queryFn: fetchCareers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  // Compute all departments with counts
  const { allDepartments, departmentCounts } = useMemo(() => {
    const departmentsSet = new Set<string>();
    const counts: Record<string, number> = { All: careers.length };

    careers.forEach((career) => {
      departmentsSet.add(career.department);
      counts[career.department] = (counts[career.department] || 0) + 1;
    });

    return {
      allDepartments: ['All', ...Array.from(departmentsSet).sort()],
      departmentCounts: counts,
    };
  }, [careers]);

  // Function to get filtered careers by department
  const getFilteredCareers = useCallback(
    (selectedDepartment: string): Career[] => {
      return selectedDepartment === 'All'
        ? careers
        : careers.filter((career) => career.department === selectedDepartment);
    },
    [careers]
  );

  // Compute status counts
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      total: careers.length,
      draft: 0,
      published: 0,
    };

    careers.forEach((career) => {
      const status = career.status as keyof typeof counts;
      if (status in counts) {
        counts[status]++;
      }
    });

    return counts;
  }, [careers]);

  // Create job mutation
  const createMutation = useMutation({
    mutationFn: async (data: Omit<Career, 'id' | 'createdAt' | 'updatedAt'>) => {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          error: 'Failed to create job',
        }));
        throw new Error(errorData.error || 'Failed to create job');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-careers'] });
    },
  });

  // Update job mutation
  const updateMutation = useMutation({
    mutationFn: async (data: Partial<Career> & { id: string }) => {
      const { id, ...updateData } = data;
      const res = await fetch(`/api/careers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          error: 'Failed to update job',
        }));
        throw new Error(errorData.error || 'Failed to update job');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-careers'] });
    },
  });

  // Delete job mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/careers/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          error: 'Failed to delete job',
        }));
        throw new Error(errorData.error || 'Failed to delete job');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-careers'] });
    },
  });

  return {
    careers,
    allDepartments,
    departmentCounts,
    statusCounts,
    isLoading,
    error,
    getFilteredCareers,
    createCareer: createMutation.mutate,
    updateCareer: updateMutation.mutate,
    deleteCareer: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    refetchCareers: refetch,
  };
}
