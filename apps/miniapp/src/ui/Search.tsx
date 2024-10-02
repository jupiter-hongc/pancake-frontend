import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

import { SearchV2S24 } from "../icons/SearchV2S24";
import { cn } from "./utils";

const Search = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
    placeholder?: string;
  }
>(({ className, ...props }, ref) => {
  const { value, onValueChange, placeholder, ...rest } = props;
  const [search, setSearch] = React.useState(value);

  React.useEffect(() => {
    if (onValueChange) onValueChange(search || "");
  }, [onValueChange, search]);
  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-interactive-interactive01 text-t-primary",
        className
      )}
      {...rest}
    >
      <div className="flex items-center px-2" cmdk-input-wrapper="">
        <SearchV2S24 className="mr-1 h-4 w-4 shrink-0 text-t-placeholder" />
        <CommandPrimitive.Input
          className={cn(
            "flex h-[40px] w-full bg-transparent py-2 text-sm outline-none placeholder:text-t-third disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          value={search}
          onValueChange={setSearch}
          placeholder={placeholder}
        />
      </div>
    </CommandPrimitive>
  );
});
Search.displayName = "Search";

export { Search };
