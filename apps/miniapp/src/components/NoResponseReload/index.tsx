import { cn } from "@/ui/utils";

export const NoResponseReload = ({ className }: { className?: string }) => {
  return (
    <p className={cn("text-center text-small mt-4", className)}>
      No response on wallet?{" "}
      <button
        className="underline"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          window.location.reload();
        }}
      >
        Reload
      </button>
    </p>
  );
};
