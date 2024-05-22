import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

interface ButtonProps
   extends ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
   isLoading?: boolean;
   children: ReactNode;
}

const buttonVariants = cva(
   'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
   {
      variants: {
         variant: {
            'default': 'bg-primary text-white',
            'outline-primary':
               'bg-[linear-gradient(236deg,_rgba(93,_99,_111,_0.10)_1.26%,_rgba(25,_30,_40,_0.35)_100%)]',
            'secondary': 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            'outline-green': 'bg-green/20 border border-green',
            'ghost': 'bg-white2 text-gray2',
            'ghost-light': 'bg-white2/30',
            'link': 'text-primary underline-offset-4 hover:underline',
         },
         size: {
            default: 'h-[54px] rounded-xl p-4',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10',
         },
      },
      defaultVariants: {
         variant: 'default',
         size: 'default',
      },
   },
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, variant, size, children, isLoading = false, ...props }, ref) => {
      return (
         <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}>
            {isLoading && (
               <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                     className="opacity-25"
                     cx={12}
                     cy={12}
                     r={10}
                     stroke="currentColor"
                     strokeWidth={4}
                  />
                  <path
                     className="opacity-75"
                     fill="currentColor"
                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
               </svg>
            )}
            {isLoading ? 'Please wait...' : children}
         </button>
      );
   },
);
