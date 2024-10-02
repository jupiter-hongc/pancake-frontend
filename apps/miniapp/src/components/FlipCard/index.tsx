import { cn } from "@/ui/utils";
import { ReactNode, useEffect, useRef, useState } from "react";
import "./index.css";

const getComponents = (children: CardFlipProps["children"]) => {
  if (children.length !== 2) {
    throw new Error("CardFlip: Two children are required");
  }

  return children;
};

interface CardFlipProps {
  isFlipped: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: [ReactNode, ReactNode];
}

export const FlipCard = ({
  isFlipped,
  className,
  style,
  children,
}: CardFlipProps) => {
  const [front, back] = getComponents(children);
  const [overflowHidden, setOverflowHidden] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setOverflowHidden(!isFlipped);
    }, 600);
  }, [isFlipped]);
  return (
    <div
      className={cn(
        "isolate flip-container",
        overflowHidden && !isFlipped ? "overflow-hidden" : "",
        className
      )}
      style={style}
    >
      <div
        className={cn("flip-inner")}
        style={{
          transform: `rotate3d(0, 1, 0, ${isFlipped ? 180 : 0}deg)`,
        }}
      >
        <div className={cn("flip-card flex", isFlipped ? "z-10" : "z-20")}>
          {front}
        </div>
        <div
          className={cn(
            "flip-card flip-card-back flex",
            isFlipped ? "z-20" : "z-10"
          )}
        >
          {back}
        </div>
      </div>
    </div>
  );
};
