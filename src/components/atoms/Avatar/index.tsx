import React, { useEffect, useRef } from "react";

import { cn, createAvatar } from "@/utils";

export const Avatar: React.FC<{
  address: string;
  className?: string;
}> = ({ address, className }) => {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (avatarRef.current) {
      try {
        createAvatar(avatarRef.current, address);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error.message);
      }
    }
  }, [address]);

  return <div className={cn("w-7 h-7", className)} ref={avatarRef} />;
};
