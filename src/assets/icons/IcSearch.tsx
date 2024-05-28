import { cn } from '@/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IcSearchProps {
   className?: string;
}

export const IcSearch = ({ className, ...props }: IcSearchProps) => {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         className={cn('size-6', className)}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round">
         <circle
            cx="11"
            cy="11"
            r="8"
         />
         <path d="m21 21-4.3-4.3" />
      </svg>
   );
};
