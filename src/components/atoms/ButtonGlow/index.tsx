import { cn } from "@/utils";
import { ReactNode } from "react";

export const ButtonGlow = ({
  children,
  onClick,
  classNameButton,
  classNameContent,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  classNameButton?: string;
  classNameContent?: string;
}) => {
  return (
    <>
      <div
        onClick={onClick}
        className={cn(
          `cursor-pointer border-animate-wrapper rounded-full w-[150px]  min-h-[48px]`,
          classNameButton
        )}
      >
        <div
          className={cn(
            `border-animate-content w-full gap-2 text-white bg-gradient-to-l from-[#161415] to-[#040102] rounded-full flex items-center justify-center`,
            classNameContent
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};
