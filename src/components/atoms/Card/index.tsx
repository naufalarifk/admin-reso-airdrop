import { cn } from '@/utils';
import type { ReactNode } from 'react';

export function Card({ className, children }: { className?: string; children: ReactNode }) {
   return (
      <div className={cn('rounded-2xl border border-white/10 bg-dark2 p-6', className)}>
         {children}
      </div>
   );
}
