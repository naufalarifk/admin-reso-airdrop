import { cn } from '@/utils';

export const IcMinus = ({ className }: { className?: string }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         strokeWidth={1.5}
         stroke="currentColor"
         className={cn('size-4', className)}>
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14"
         />
      </svg>
   );
};
