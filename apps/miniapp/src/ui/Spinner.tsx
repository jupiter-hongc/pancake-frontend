import { forwardRef } from "react";

import { cn } from "./utils";

type SpinnerProps = {
  color?: string;
  className?: string;
};

const Rect = ({ delay, color }: { delay: string; color: string }) => (
  <div
    className="h-full w-[3px] animate-spinner"
    style={{ animationDelay: delay, backgroundColor: color }}
  />
);

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      color = "rgb(var(--colors-interactive-primary))",
      className,
      ...restProps
    }: SpinnerProps,
    ref
  ) => {
    const spinners = [0.5, 0.2, 0.2, 0.5].map((val) => `-${val}s`);

    return (
      <div
        className={cn(
          "spinner flex w-[30px] h-[30px] items-center justify-between",
          className
        )}
        ref={ref}
        {...restProps}
      >
        {spinners.map((val, index) => (
          <Rect key={index} delay={val} color={color} />
        ))}
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };
