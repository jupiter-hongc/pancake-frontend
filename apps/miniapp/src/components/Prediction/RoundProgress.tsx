import { BetPosition } from "@/constants";
import { useRoundProgress } from "@/hooks/useRoundProgress";
import { RoundedData } from "@/hooks/useRoundsData";
import { cn } from "@/ui/utils";

const BarBgMap = {
  [BetPosition.HOUSE]: "bg-[#EEEAF4]",
  [BetPosition.BULL]: "bg-[#067962]",
  [BetPosition.BEAR]: "bg-[#AF287E]",
};
const ProgressBgMap = {
  [BetPosition.HOUSE]: "bg-[#7645D9]",
  [BetPosition.BULL]: "bg-[#31D0AA]",
  [BetPosition.BEAR]: "bg-[#ED4B9E]",
};

export const Progress = (props: {
  position: BetPosition;
  progress: number;
}) => {
  return (
    <div className={cn("h-2", BarBgMap[props.position])}>
      <div
        className={cn("h-full", ProgressBgMap[props.position])}
        style={{ width: `${props.progress}%` }}
      ></div>
    </div>
  );
};

interface RoundProgressProps {
  round: RoundedData;
  position: BetPosition;
  stayZero?: boolean;
  isLive: boolean;
}

export const RoundProgress = ({
  round,
  position,
  stayZero,
  isLive,
  ...props
}: RoundProgressProps) => {
  const progress = useRoundProgress(round, isLive);
  return (
    <Progress
      progress={stayZero ? 0 : progress}
      position={position}
      {...props}
    />
  );
};
