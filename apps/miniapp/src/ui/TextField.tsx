import { type VariantProps, cva } from "class-variance-authority";
import React from "react";

import { cn } from "./utils";
import { Input } from "./Input";

const textFieldVariants = cva(
  "rounded bg-interactive-interactive02 text-body1 focus-visible:ring-0 ring-0 focus-visible:ring-offset-0 placeholder:text-t-placeholder input-text-field",
  {
    variants: {
      inputSize: {
        default: "h-10 py-2 px-4",
        lg: "h-12 py-6 px-9",
        md: "h-10 py-2 px-4",
        sm: "h-6 px-2 text-caption1",
        xs: "h-4 px-2 py-1 text-caption1",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

interface TextFieldProps
  extends React.ComponentProps<typeof Input>,
    VariantProps<typeof textFieldVariants> {
  error?: boolean;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ error, className, inputSize, ...rest }, ref) => {
    return (
      <Input
        ref={ref}
        {...rest}
        className={cn(
          textFieldVariants({ inputSize }),
          className,
          error ? "border-t-error" : "border-transparent"
        )}
      />
    );
  }
);

TextField.displayName = "TextField";

export { TextField };
