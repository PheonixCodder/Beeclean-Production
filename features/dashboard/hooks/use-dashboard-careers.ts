'use client';

import { useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCareers, createCareer as createCareerAction, updateCareer as updateCareerAction, deleteCareer as deleteCareerAction } from '@/app/actions/careers';

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
  createdAt: string | Date;
  updatedAt: string | Date;
}



export function useDashboardCareers() {
  const queryClient = useQueryClient();

  const {
    data: careers = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['dashboard-careers'],
    queryFn: async () => {
      const data = await getCareers(undefined, true);
      return data as Career[];
    },
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
      return await createCareerAction(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-careers'] });
    },
  });

  // Update job mutation
  const updateMutation = useMutation({
    mutationFn: async (data: Partial<Career> & { id: string }) => {
      const { id, ...updateData } = data;
      return await updateCareerAction(id, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-careers'] });
    },
  });

  // Delete job mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteCareerAction(id);
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
