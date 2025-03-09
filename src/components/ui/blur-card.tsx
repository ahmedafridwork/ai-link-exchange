
import * as React from "react";
import { cn } from "@/lib/utils";

interface BlurCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  hoverEffect?: boolean;
}

const BlurCard = React.forwardRef<HTMLDivElement, BlurCardProps>(
  ({ className, children, hoverEffect = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-card p-6",
          hoverEffect && "animate-hover",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BlurCard.displayName = "BlurCard";

export { BlurCard };
