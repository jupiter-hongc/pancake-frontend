import { cn } from "@/ui/utils";

import "./index.css";

export const LiveDot = ({ isBull }: { isBull: boolean }) => {
  return (
    <div
      className={cn(
        "rounded-full w-4 h-4 flex items-center justify-center",
        isBull ? "bg-[rgb(58,158,161)]" : "bg-[rgb(189,66,154)]"
      )}
    >
      <div className="w-1.5 h-1.5 bg-t-white rounded-full live-dot-animation" />
    </div>
  );
};
