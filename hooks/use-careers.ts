'use client';

import { useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

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
}

const fetchCareers = async (): Promise<Career[]> => {
  const res = await fetch('/api/careers');
  if (!res.ok) {
    throw new Error('Failed to fetch careers');
  }
  return res.json();
};

export function useCareers() {
  const {
    data: careers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['careers'],
    queryFn: fetchCareers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  // Compute all departments with counts (similar to tag filtering)
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

  return {
    careers,
    allDepartments,
    departmentCounts,
    isLoading,
    error,
    getFilteredCareers,
  };
}
