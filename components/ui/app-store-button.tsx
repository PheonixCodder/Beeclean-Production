'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AppStoreButtonProps {
  className?: string;
  variant?: 'black' | 'white' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function AppStoreButton({
  className,
  variant = 'black',
  size = 'md',
}: AppStoreButtonProps) {
  const appStoreUrl = 'https://apps.apple.com/app/beeclean';

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn('inline-block cursor-pointer', className)}
      // Use onTap for mobile/desktop reliability
      onTap={() => {
        window.open(appStoreUrl, '_blank', 'noopener,noreferrer');
      }}
    >
      <Button
        className={cn(
          'rounded-3xl font-bold tracking-tight transition-all duration-200 flex items-center gap-2',
          variant === 'black' && 'bg-black text-white hover:bg-zinc-900 border-none',
          variant === 'white' && 'bg-white text-black hover:bg-zinc-50 border-none',
          variant === 'outline' && 'bg-transparent text-black hover:bg-zinc-50 border border-zinc-200',
          size === 'sm' && 'px-4 py-3 text-xs',
          size === 'md' && 'px-6 py-5 text-[13px]',
          size === 'lg' && 'px-8 py-6 text-sm',
          size === 'xl' && 'px-10 py-8 text-sm'
        )}
      >
        <img
          src="/apple.svg"
          width={size === 'sm' ? 16 : 20}
          alt="Apple"
          className={cn(
            'mb-0.5',
            variant === 'black' ? 'brightness-0 invert' : 'brightness-0'
          )}
        />
        <span>Download for iPhone</span>
      </Button>
    </motion.div>
  );
}
