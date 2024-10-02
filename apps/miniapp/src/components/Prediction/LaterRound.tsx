import useCountdown from "@/hooks/useCountdown";
import { RoundedData } from "@/hooks/useRoundsData";
import { formatRoundTime } from "@/utils/format";
import { memo } from "react";

export const LaterRound = memo(
  ({ round, increase = 1 }: { round: RoundedData; increase?: number }) => {
    const { secondsRemaining } = useCountdown(Number(round.lockTimestamp) ?? 0);
    const countdown = formatRoundTime(
      secondsRemaining + 5 * (increase - 1) * 60
    );
    return (
      <div
        id={`later-round-${increase}`}
        className="rounded-3xl bg-interactive-interactiveTertiary/70 border border-border-line hidden mdh:block"
      >
        <div className="flex justify-between h-16 items-center text-t-white text-bold px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-t-fillSecondary text-base font-semibold">
              Later
            </span>
            <i className="w-1 h-1 rounded-full bg-t-fillSecondary" />
            <span className="text-t-fillSecondary text-base font-semibold">
              Entry Starts in:&nbsp;{countdown}
            </span>
          </div>
          <span className="text-body text-t-fillSecondary">
            #{Number(round.epoch + BigInt(increase))}
          </span>
        </div>
      </div>
    );
  }
);
