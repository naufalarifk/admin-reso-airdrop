import { cn } from '@/utils';

export function IcDocuments({ className }: { className?: string }) {
   return (
      <svg
         viewBox="0 0 27 26"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         className={cn('size-6 text-white', className)}>
         <path
            d="M5.917 14.083V5.417A2.167 2.167 0 018.083 3.25h13a2.167 2.167 0 012.167 2.167V19.5c0 1.083-.65 3.25-3.25 3.25m0 0H7c-1.083 0-3.25-.65-3.25-3.25v-2.167h13V19.5c0 2.6 2.167 3.25 3.25 3.25zM10.25 7.583h8.667m-8.667 4.334h4.333"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   );
}
