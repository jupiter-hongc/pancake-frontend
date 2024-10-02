import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "./utils";

const alertVariants = cva(
  "relative w-full rounded border-none p-2 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-2 [&>svg]:top-2 [&:has(svg)]:pl-[26px]",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        error:
          "bg-[rgb(var(--colors-interactive-sell))]/10 text-interactive-sell",
        destructive:
          "text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-caption2 leading-[14px] [&_p]:leading-relaxed",
      className
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
