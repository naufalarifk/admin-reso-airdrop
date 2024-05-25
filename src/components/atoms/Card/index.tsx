import { cn } from '@/utils';
import type { ReactNode } from 'react';

export function Card({ className, children }: { className?: string; children: ReactNode }) {
   return (
      <div
         className={cn('rounded-2xl bg-dark2 p-4 lg:border lg:border-white/10 lg:p-6', className)}>
         {children}
      </div>
   );
}
