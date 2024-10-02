import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@/ui/Popover";
import React, { useRef } from "react";

type Props = {
  error?: string;
  children?: React.ReactNode;
  align?: React.ComponentPropsWithoutRef<typeof PopoverContent>["align"];
};

const ErrorMessage = React.memo(
  ({ error, children, align = "start" }: Props) => {
    const fieldError = Boolean(error);
    const container = useRef<HTMLDivElement>(null);

    return (
      <div
        ref={container}
        className="relative [&_[data-radix-popper-content-wrapper]]:!absolute [&_[data-radix-popper-content-wrapper]]:!w-[var(--radix-popper-anchor-width)]"
      >
        <Popover open={fieldError}>
          <PopoverPortal container={container.current}>
            <PopoverContent
              side={"top"}
              align={align}
              sideOffset={-1}
              className={
                "outline-none p-2 bg-interactive-interactivePopup shadow-t-error top-[5px] rounded-md"
              }
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <PopoverArrow />
              <div className={"text-xs whitespace-pre-line text-t-error"}>
                {error}
              </div>
            </PopoverContent>
          </PopoverPortal>
          <PopoverTrigger asChild>{children}</PopoverTrigger>
        </Popover>
      </div>
    );
  }
);

export default ErrorMessage;
