'use client';

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

const fetchCareer = async (id: string): Promise<Career> => {
  const res = await fetch(`/api/careers/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Not found');
    }
    throw new Error('Failed to fetch career');
  }

  return res.json();
};

export function useCareer(id: string) {
  const {
    data: career = null,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['career', id],
    queryFn: () => fetchCareer(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 404
      if (error instanceof Error && error.message === 'Not found') {
        return false;
      }
      return failureCount < 1;
    },
    enabled: !!id && id.length > 0,
  });

  return {
    career,
    isLoading,
    error,
  };
}
