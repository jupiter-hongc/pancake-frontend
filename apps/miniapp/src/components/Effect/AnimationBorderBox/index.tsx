import { cn } from "@/ui/utils";

import "./index.css";

interface Props {
  run: boolean;
  isBull: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const AnimationBorderBoxDuration = 1500;

export const AnimationBorderBox = ({
  run,
  isBull,
  className,
  children,
}: Props) => {
  const circleColor = isBull
    ? "bg-[rgba(27,197,156,1)]"
    : "bg-[rgba(255,116,192,1)]";
  const triangleColor = isBull
    ? "border-t-interactive-interactiveExpandPositive"
    : "border-t-interactive-interactiveExpandDestructive";
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-0 border rounded-xl mt-2 py-1 relative",
        className,
        isBull
          ? "bg-[#EAFBF7] border-interactive-interactiveExpandPositive"
          : "bg-[#FFF0F9] border-interactive-interactiveExpandDestructive",
        {
          "animate-run animate-bull-border": run && isBull,
          "animate-run animate-bear-border": run && !isBull,
        }
      )}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0">
        <div className="confetti-group group-1">
          <span className={cn("circle", circleColor)} />
          <span className={cn("triangle", triangleColor)} />
        </div>
        <div className="confetti-group group-2">
          <span className={cn("circle", circleColor)} />
          <span className={cn("triangle", triangleColor)} />
        </div>
        <div className="confetti-group group-3">
          <span className={cn("circle", circleColor)} />
          <span className={cn("triangle", triangleColor)} />
        </div>
        <div className="confetti-group group-4">
          <span className={cn("circle", circleColor)} />
          <span className={cn("triangle", triangleColor)} />
        </div>
        <div className="confetti-group group-5">
          <span className={cn("circle", circleColor)} />
          <span className={cn("triangle", triangleColor)} />
        </div>
      </div>

      {children}
    </div>
  );
};
