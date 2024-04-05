import { cn } from "@/utils";
import { ReactNode } from "react";

export const ButtonGlow = ({
  children,
  onClick,
  className,
  classNameContent,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  classNameContent?: string;
}) => {
  return (
    <>
      <div
        onClick={onClick}
        className={cn(
          `cursor-pointer border-animate-wrapper rounded-full w-[150px] min-w--[150px] min-h-[48px]`,
          className
        )}
      >
        <div
          className={cn(
            `border-animate-content   gap-2 text-white bg-gradient-to-l from-[#161415] to-[#040102] rounded-full flex items-center justify-center`,
            classNameContent
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};
