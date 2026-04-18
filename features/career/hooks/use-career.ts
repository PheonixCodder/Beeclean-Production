'use client';

import { useQuery } from '@tanstack/react-query';
import { getCareer } from '@/app/actions/careers';

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



export function useCareer(id: string) {
  const {
    data: career = null,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['career', id],
    queryFn: async () => {
      const data = await getCareer(id);
      return data as Career;
    },
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
