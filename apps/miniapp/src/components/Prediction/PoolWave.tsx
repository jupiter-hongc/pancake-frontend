import { cn } from "@/ui/utils";

type Props = {
  children?: React.ReactNode;
  type: "UP" | "DOWN" | "NEUTRAL";
};

export const PoolWave = ({ children, type }: Props) => {
  return (
    <div
      className={cn(
        "w-56 h-56 bg-interactive-interactive01 rounded-full m-4 transition-all relative overflow-hidden",
        type === "UP"
          ? "shadow-[0px_0px_8.1px_8.1px_rgba(26,194,154,0.2)]"
          : type === "DOWN"
          ? "shadow-[0px_0px_8.1px_8.1px_rgba(237,75,158,0.2)]"
          : ""
      )}
    >
      <div
        className={cn(
          "w-[300%] h-[300%] absolute -left-full rounded-[40%] top-[3%] animate-spin [animation-duration:5s] ease-linear",
          type === "DOWN" ? "bg-interactive-sell/40" : "bg-interactive-buy/40"
        )}
      />
      <div
        className={cn(
          "w-[300%] h-[300%] absolute -left-full rounded-[43%] top-[6%] animate-spin [animation-duration:5s] ease-linear",
          type === "DOWN" ? "bg-interactive-sell/40" : "bg-interactive-buy/40"
        )}
      />
      <div
        className={cn(
          "w-[300%] h-[300%] absolute -left-full rounded-[45%] top-[9%] animate-spin [animation-duration:5s] ease-linear",
          type === "DOWN" ? "bg-interactive-sell/40" : "bg-interactive-buy/40"
        )}
      />
      {children}
    </div>
  );
};
