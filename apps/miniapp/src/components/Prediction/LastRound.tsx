import { usePredictionData } from "@/hooks/usePredictionData";
import type { RoundedData } from "@/hooks/useRoundsData";
import { ArrowDownR } from "@/icons/ArrowDownR";
import { cn } from "@/ui/utils";
import { getHasRoundFailed } from "@/utils/calculate";
import { formatBigIntToFixed } from "@/utils/format";
import { memo, useMemo } from "react";

const Item = memo(
  ({
    round,
    isCanceled,
    isBull,
  }: {
    round: RoundedData;
    isCanceled: boolean;
    isBull: boolean;
  }) => {
    return (
      <div className={cn("flex flex-col items-left text-t-fillSecondary")}>
        <div className="text-xs font-normal text-t-fillSecondary">
          #{Number(round.epoch)}
        </div>
        <div className="flex items-center gap-0.5">
          {isCanceled && (
            <span className="text-smallBold text-t-fillSecondary">
              Cancelled
            </span>
          )}
          {!isCanceled && (
            <>
              {isBull ? (
                <ArrowDownR className="w-2.5 h-2.5 rotate-180 text-t-buy" />
              ) : (
                <ArrowDownR className="w-2.5 h-2.5 text-t-sell" />
              )}
              <div
                className={cn(
                  "text-smallBold text-t-primary",
                  isBull ? "text-t-buy" : "text-t-sell"
                )}
              >
                ${formatBigIntToFixed(round.closePrice, 4, 8)}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

export const LastRounds = memo(
  ({
    rounds,
    positionOpen,
  }: {
    rounds: RoundedData[];
    positionOpen: boolean;
  }) => {
    const {
      data: { bufferSeconds },
    } = usePredictionData();

    const positionOpenStyle = useMemo(
      () =>
        positionOpen
          ? {
              transform: "perspective(500px) translate3d(0px, -20px, -60px)",
            }
          : {},
      [positionOpen]
    );
    return (
      <div
        id="last-rounds"
        className={cn(
          "border-border-line bg-interactive-interactiveTertiary px-4 py-2 rounded-3xl flex items-top transition-all duration-500 mdh:py-4",
          positionOpen && "mdh:py-2"
        )}
        style={positionOpenStyle}
      >
        <>
          <span className="text-base font-semibold text-t-fillSecondary">
            LAST
          </span>
          <div className="flex h-[39px] w-full justify-between ml-[13px] items-center">
            {rounds.length > 0 &&
              rounds.map((round) => {
                const isBull = round.closePrice > round.lockPrice;
                const isCanceled = getHasRoundFailed(
                  round,
                  bufferSeconds,
                  false
                );
                return (
                  <Item
                    key={round.epoch}
                    round={round}
                    isBull={isBull}
                    isCanceled={isCanceled}
                  />
                );
              })}
          </div>
        </>
      </div>
    );
  }
);
