'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface Newsletter {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const fetchNewsletters = async (): Promise<Newsletter[]> => {
  const res = await fetch('/api/newsletter');
  if (!res.ok) {
    throw new Error('Failed to fetch newsletters');
  }
  return res.json();
};

export function useDashboardNewsletter() {
  const {
    data: newsletters = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['dashboard-newsletter'],
    queryFn: fetchNewsletters,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });

  const statusCounts = useMemo(() => {
    const counts = {
      total: newsletters.length,
      active: 0,
      unsubscribed: 0,
    };

    newsletters.forEach((n) => {
      if (n.isActive) {
        counts.active++;
      } else {
        counts.unsubscribed++;
      }
    });

    return counts;
  }, [newsletters]);

  return {
    newsletters,
    statusCounts,
    isLoading,
    error,
    refetchNewsletters: refetch,
  };
}
