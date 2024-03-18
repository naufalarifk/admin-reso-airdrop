import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

interface TextProps
  extends HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof textVariants> { }

const textVariants = cva("block", {
  variants: {
    variant: {
      default: "text-[0.75rem]",
      wallet: "text-[2rem]",
      heading: "text-[1.5rem] ",
      heading2: "text-[1rem]",
      heading3: "text-[0.875rem]",
      info: "text-[0.625rem]",
      title: "text-[2.5rem]",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semiBold: "font-semibold",
      bold: "font-bold",
    },
    textColor: {
      soft: "text-gray2",
      black: "text-[#323232]",
      lighGray: "text-gray3",
      default: "text-white"
    },
  },
  defaultVariants: {
    variant: "default",
    weight: "normal",
    textColor: "default",
  },
});

export const Text = forwardRef<HTMLDivElement, TextProps>(function Text(
  { className, variant, textColor, weight, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(textVariants({ variant, className, textColor, weight }))}
      {...props}
    />
  );
});
