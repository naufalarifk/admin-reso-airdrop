import { cn } from "@/utils";
import type { ReactNode } from "react";

type SkeletonProps = {
  children: ReactNode;
  className?: string;
};

export function Skeleton({ children, className = "" }: SkeletonProps) {
  return (
    <div className="relative w-full">
      <div
        className={cn(
          className,
          `relative 
          overflow-hidden
          rounded-lg
          before:absolute
          before:inset-0 before:-translate-x-full
          before:animate-[shimmer_2s_infinite]
          before:border-t
          before:border-t-[#41414A]
          before:bg-gradient-to-r
          before:from-transparent before:via-[#34353E] before:to-transparent`
        )}
      >
        {children}
      </div>
    </div>
  );
}
