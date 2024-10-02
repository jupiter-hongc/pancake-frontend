import { LivePrice } from "./LivePrice";
import { BetPosition } from "@/constants";
import { RoundProgress } from "./RoundProgress";
import { formatBigIntToFixed, formatRoundTime } from "@/utils/format";
import { cn } from "@/ui/utils";
import { RoundedData } from "@/hooks/useRoundsData";
import useCountdown from "@/hooks/useCountdown";
import { ArrowDownR } from "@/icons/ArrowDownR";
import { usePayout } from "@/hooks/usePayout";
import { useMemo } from "react";
import type { LedgerProp } from "@/types/index";
import { getHasRoundFailed } from "@/utils/calculate";
import { CanceledRound } from "./CanceledRound";
import { usePredictionData } from "@/hooks/usePredictionData";
import { LivePaused } from "./LivePaused";
import { LiveDot } from "../Effect/LiveDot/LiveDot";
import { AnimationBorderBox } from "../Effect/AnimationBorderBox";
import { useHasLedgerNoticed } from "@/hooks/useHasLedgerNoticed";

export const LiveRound = ({
  round,
  betPosition,
  price,
  positionOpen,
  onPositionOpen,
  paused,
  ledger,
}: {
  round: RoundedData;
  betPosition: BetPosition;
  price: bigint;
  positionOpen: boolean;
  onPositionOpen: (open: boolean) => void;
  paused: boolean;
  ledger: LedgerProp;
}) => {
  const {
    data: { bufferSeconds },
  } = usePredictionData();
  const { secondsRemaining } = useCountdown(Number(round.closeTimestamp) ?? 0);
  const countdown = formatRoundTime(secondsRemaining);
  const isBull = price > round.lockPrice;
  const payout = usePayout(round);
  const ledgerBull = ledger.position === BetPosition.BULL;
  const hasNoticed = useHasLedgerNoticed(ledger);
  const hasRoundFailed = getHasRoundFailed(round, bufferSeconds, true);
  const positionOpenStyle = useMemo(
    () =>
      positionOpen
        ? {
            transform: "perspective(500px) translate3d(0px, -84px, 0px)",
            maxHeight: "46px",
            boxShadow: "0 3px 3px rgba(0,0,0,.2)",
          }
        : {},
    [positionOpen]
  );
  if (hasRoundFailed)
    return <CanceledRound round={round} style={positionOpenStyle} />;
  if (paused) return <LivePaused style={positionOpenStyle} />;
  return (
    <div
      id="live-round"
      className={cn(
        "rounded-3xl bg-background-bg1 border overflow-hidden transition-all duration-500 max-h-[215px] mdh:max-h-[234px]",
        isBull
          ? "border-interactive-interactiveExpandPositive"
          : "border-interactive-interactiveExpandDestructive"
      )}
      style={positionOpenStyle}
      onClick={positionOpen ? onPositionOpen.bind(null, false) : undefined}
    >
      <div
        className={cn(
          "flex justify-between h-10 items-center text-t-white px-4 py-2 mdh:py-4 transition-all",
          positionOpen ? "h-[46px]" : "h-10 mdh:h-[60px]"
        )}
        style={{
          background: isBull
            ? positionOpen
              ? "linear-gradient(180deg, #31D0AA, #31D0AA)"
              : `linear-gradient(180deg,rgb(48,198,161),rgb(40,172,140))`
            : positionOpen
            ? "linear-gradient(180deg, #ED4B9E, #ED4B9E)"
            : `linear-gradient(180deg,rgb(225,71,150),rgb(197,57,129))`,
        }}
      >
        <div className="flex gap-1 items-center">
          <LiveDot isBull={isBull} />
          <span className="text-t-white text-base font-semibold">LIVE</span>
          <i className="block w-1 h-1 bg-t-white rounded-full" />
          <span className="text-t-white text-base font-semibold">
            {countdown}
          </span>
        </div>
        <div
          className={cn(
            "flex items-center gap-1 justify-center h-12",
            !positionOpen && "hidden"
          )}
        >
          <LivePrice
            price={price}
            betPosition={betPosition}
            className="text-xl text-t-white"
          />
          {isBull ? (
            <ArrowDownR className="w-3 rotate-180 text-t-white" />
          ) : (
            <ArrowDownR className="w-3 text-t-white" />
          )}
        </div>
        <span className="text-t-white text-base font-normal">
          #{Number(round.epoch)}
        </span>
      </div>
      <>
        <div>
          <RoundProgress position={betPosition} round={round} isLive />
        </div>
        <div
          className="mx-auto relative text-center px-4 pt-4 pb-3 mdh:pb-4"
          style={{
            background: `linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)`,
          }}
        >
          {secondsRemaining > 0 ? (
            <div
              className={cn(
                "flex justify-center items-center",
                ledger.hasEntered && "justify-between"
              )}
            >
              <div className="flex items-center gap-1 justify-center h-12">
                {isBull ? (
                  <ArrowDownR className="rotate-180 w-4 text-t-buy" />
                ) : (
                  <ArrowDownR className="w-4 text-t-sell" />
                )}
                <LivePrice
                  price={price}
                  betPosition={betPosition}
                  className={ledger.hasEntered ? "text-2xl" : ""}
                />
              </div>
              {ledger.hasEntered && (
                <AnimationBorderBox
                  run={!hasNoticed}
                  isBull={ledgerBull}
                  className="border-2 px-2 py-1 flex flex-col items-center rounded-xl"
                >
                  <div className="flex items-center font-semibold text-sm gap-0.5">
                    {ledgerBull ? (
                      <ArrowDownR className="w-2.5 rotate-180 text-t-buy" />
                    ) : (
                      <ArrowDownR className="w-2.5 text-t-sell" />
                    )}
                    {ledgerBull ? (
                      <span className="text-t-buy">UP</span>
                    ) : (
                      <span className="text-t-sell">DOWN</span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-xs font-normal",
                      ledgerBull ? "text-[#129E7D]" : "text-[#D14293]"
                    )}
                  >
                    Position:&nbsp;
                    {formatBigIntToFixed(ledger.enterAmount, 4, 18)} BNB
                  </p>
                </AnimationBorderBox>
              )}
            </div>
          ) : (
            <div className="flex flex-col text-center">
              <img
                className="w-auto h-[96px] mx-auto block"
                alt="calculating"
                src="https://assets.pancakeswap.finance/web/pancake-3d-spinner-v2.gif"
              />
              <span className="text-t-primary text-base font-normal mt-2">
                Calculating...
              </span>
            </div>
          )}
          {secondsRemaining > 0 && (
            <div className="flex flex-col mt-2 gap-0.5 text-t-secondary text-[12px]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-t-fillSecondary">
                  LOCKED PRICE
                </span>
                <span className="text-t-primary text-sm">
                  ${formatBigIntToFixed(round.lockPrice, 4, 8)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-t-fillSecondary uppercase">
                  Reward Pool
                </span>
                <span className="text-t-primary text-sm">
                  {formatBigIntToFixed(round.totalAmount * BigInt(1e4), 4, 22)}
                  &nbsp;BNB
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-t-fillSecondary">
                  PAYOUT
                </span>
                <div className="text-t-primary flex items-center gap-1 text-sm">
                  <span>UP: {payout.up}x</span>
                  <div className="border-l h-3 border-t-disabled" />
                  <span>DOWN: {payout.down}x</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
};
