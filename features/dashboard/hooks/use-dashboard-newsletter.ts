'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getNewsletters } from '@/app/actions/newsletter';

export interface Newsletter {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}


export function useDashboardNewsletter() {
  const {
    data: newsletters = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['dashboard-newsletter'],
    queryFn: getNewsletters,
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
