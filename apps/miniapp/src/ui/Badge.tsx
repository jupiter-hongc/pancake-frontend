import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-t-primary hover:bg-t-primary/80 border-transparent text-primary-foreground",
        secondary:
          "bg-t-secondary hover:bg-t-secondary/80 border-transparent text-secondary-foreground",
        accent02:
          "bg-background-bg1Accent02 hover:bg-background-bg1Accent02/80 border-transparent text-destructive-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
