'use client';

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });
    }

    // Send to analytics service in production
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // TODO: Integrate with analytics service (Google Analytics, etc.)
      // Example: gtag('event', metric.name, { value: metric.value });
      console.log('Web Vital (production):', metric.name, metric.value);
    }
  });

  useEffect(() => {
    // Optional: Report Web Vitals to your own endpoint
    const reportWebVitals = (metric: any) => {
      // You can send metrics to your backend for aggregation
      navigator.sendBeacon?.('/api/analytics/web-vitals', JSON.stringify(metric));
    };

    // Add event listener for web vitals if needed
  }, []);

  return null;
}
