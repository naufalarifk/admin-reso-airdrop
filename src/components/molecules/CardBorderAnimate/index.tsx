import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface CardBorderAnimateProps {
   children: ReactNode;
   className?: string;
}

export const CardBorderAnimate = ({ children, className }: CardBorderAnimateProps) => {
   return (
      <div className={cn('border-container w-full  lg:max-w-[422px]', className)}>{children}</div>
   );
};
