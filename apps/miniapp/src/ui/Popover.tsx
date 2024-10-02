"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "./utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverPortal = PopoverPrimitive.Portal;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContentPrimitive = PopoverPrimitive.Content;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
    Pick<
      React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Portal>,
      "container"
    >
>(
  (
    { className, align = "center", sideOffset = 4, container, ...props },
    ref
  ) => (
    <PopoverPrimitive.Portal container={container}>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // base style
          " overflow-hidden rounded-[2px] max-w-[325px] bg-interactive-interactivePopup px-[10px] py-[5px] text-body2 text-t-onColor outline-none shadow-elevation1",
          // other style
          "animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(({ className }, ref) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    className={cn(
      // base style
      "fill-interactive-interactivePopup",
      className
    )}
  />
));

PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName;

export {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverContent,
  PopoverContentPrimitive,
  PopoverPortal,
  PopoverTrigger,
};
