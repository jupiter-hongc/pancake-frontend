"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "./utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    thumbProps?: React.ComponentProps<typeof SliderPrimitive.Thumb> & {
      dragNode: React.ReactNode;
      rangeClassName?: string;
    };
    marks?: {
      value: number;
      className?: string;
      style?: React.CSSProperties;
      onClick: (value: number) => void;
      children?: React.ReactNode;
    }[];
  }
>(({ className, orientation, marks, thumbProps = {}, ...props }, ref) => {
  const {
    className: thumbClassName,
    rangeClassName,
    dragNode,
    children,
    ...rest
  } = thumbProps;

  const [dragging, setDragging] = React.useState(false);

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      onPointerUp={dragNode ? () => setDragging(false) : undefined}
      onPointerDown={dragNode ? () => setDragging(true) : undefined}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-interactive-interactive01 cursor-pointer">
        <SliderPrimitive.Range
          className={cn(
            "slider-range absolute h-full bg-interactive-primary",
            rangeClassName
          )}
        />
      </SliderPrimitive.Track>
      {marks &&
        marks.map((mark, i) => {
          return (
            <button
              type="button"
              key={`slider_mark_${i}`}
              className={cn(
                `absolute cursor-pointer rounded-full ${
                  orientation === "horizontal"
                    ? "-translate-x-1/2"
                    : "-translate-y-1/2"
                }`,
                mark.className
              )}
              style={mark.style}
              onClick={() => mark.onClick(mark.value)}
            >
              {mark.children}
            </button>
          );
        })}

      <SliderPrimitive.Thumb
        className={cn(
          "block cursor-pointer box-content h-3 w-3 rounded-full border-0 bg-border-lineStrong dark:bg-t-onColor ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 border-interactive-primary focus-within:outline-none",
          thumbClassName
        )}
        {...rest}
        asChild
      >
        <span>
          {dragging ? dragNode : null}
          {children}
        </span>
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
