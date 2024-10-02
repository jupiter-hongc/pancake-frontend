import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "./utils";

const buttonVariants = cva(
  "text-subtitle1 font-medium inline-flex items-center justify-center rounded-2xl focus-visible:outline-none disabled:cursor-not-allowed button border-b-2 border-[rgba(0,0,0,0.2)]",
  {
    variants: {
      variant: {
        default:
          "bg-primary-gradient text-t-onColor hover:bg-interactive-primaryActive disabled:bg-none hover:bg-none active:bg-interactive-primaryActive disabled:bg-primary-gradient disabled:text-t-disabled disabled:opacity-[0.7] [&_.inactive]:opacity-[0.7] hover:opacity-65 transition-opacity active:opacity-85",
        secondary:
          "bg-interactive-interactive02 hover:bg-interactive-interactive02Hover active:bg-interactive-interactive01Active disabled:bg-interactive-fillDisabled disabled:text-t-disabled [&_.inactive]:opacity-[0.3] text-t-primary",
        primary:
          "bg-interactive-primary hover:bg-interactive-primaryHover active:bg-interactive-primaryActive disabled:bg-none disabled:bg-interactive-fillDisabled disabled:text-t-white [&_.inactive]:opacity-[0.3]",
        // todo
        // other ui use this variant, need delete them
        outline:
          "border bg-transparent border-interactive-primary text-interactive-primary hover:bg-transparent hover:border-t-white hover:text-t-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        sell: "bg-interactive-sell hover:bg-interactive-sellHover disabled:bg-interactive-fillDisabled disabled:text-t-disabled [&_.inactive]:opacity-[0.3] text-t-onColor",
        buy: "bg-interactive-buy hover:bg-interactive-buyHover disabled:bg-interactive-fillDisabled disabled:text-t-disabled [&_.inactive]:opacity-[0.3] text-t-onColor",
        supportError: "bg-support-error",
        disabled: "bg-interactive-fillDisabled text-t-white",
        tertiary: "bg-interactive-interactiveTertiary text-t-fill-secondary",
      },
      size: {
        default: "h-10 py-2 px-4",
        lg: "h-12 py-6 px-9",
        md: "h-10 py-2 px-4",
        sm: "h-8 py-[0.375rem] px-3",
        xs: "h-4 px-2 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn("button", buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
