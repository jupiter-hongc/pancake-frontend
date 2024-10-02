import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@/ui/Popover";
import { cn } from "@/ui/utils";
import React, { useCallback, useRef } from "react";
import { useBoolean } from "react-use";

type ToolTipProps = {
  open?: boolean;
  mode?: "click" | "hover";
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  tip: React.ReactNode;
  tipClassName?: string;
  popoverContentClass?: string;
  ignoreOutsideInteract?: boolean;
  avoidCollisions?: boolean;
};

export const PopoverTooltip = (props: ToolTipProps) => {
  const {
    tip,
    children,
    tipClassName,
    popoverContentClass,
    mode = "hover",
    side = "top",
    align = "start",
    ignoreOutsideInteract = false,
    avoidCollisions = true,
  } = props;

  const [open, setOpen] = useBoolean(false);
  const [clicked, setClicked] = useBoolean(true);
  const clickMode = mode === "click";
  const timerRef = useRef<number>();

  const onOpen = useCallback(() => {
    setOpen(true);
    window.clearTimeout(timerRef.current);
  }, [setOpen]);
  const onClose = useCallback(() => {
    timerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 200);
  }, [setOpen]);
  const onClickOpen = useCallback(() => {
    setClicked(!clicked);
    setOpen(!open);
  }, [clicked, open, setClicked, setOpen]);
  return (
    <Popover open={open}>
      <PopoverPortal>
        <PopoverContent
          side={side}
          align={align}
          avoidCollisions={avoidCollisions}
          className={cn(
            "outline-none p-2 rounded-none bg-interactive-interactivePopup",
            popoverContentClass
          )}
          onMouseEnter={clickMode ? undefined : onOpen}
          onMouseLeave={clickMode ? undefined : onClose}
          onEscapeKeyDown={onClose}
          onInteractOutside={ignoreOutsideInteract ? undefined : onClose}
        >
          <PopoverArrow />
          <div
            className={cn(
              "text-t-secondary text-caption whitespace-pre-line",
              tipClassName
            )}
          >
            {tip}
          </div>
        </PopoverContent>
      </PopoverPortal>
      <PopoverTrigger
        asChild
        onMouseEnter={clickMode ? undefined : onOpen}
        onMouseLeave={clickMode ? undefined : onClose}
        onClick={clickMode ? onClickOpen : onOpen}
        className="cursor-pointer"
      >
        {children}
      </PopoverTrigger>
    </Popover>
  );
};
