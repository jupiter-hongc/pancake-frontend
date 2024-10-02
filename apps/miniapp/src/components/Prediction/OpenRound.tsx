import { formatBigIntToFixed, formatRoundTime } from "@/utils/format";
import { RoundedData } from "@/hooks/useRoundsData";
import { Button } from "@/ui/Button";
import { BetPositionOrder } from "./BetPosition";
import { BetPosition } from "@/constants";
import { useEffect, useMemo, useState } from "react";
import useCountdown from "@/hooks/useCountdown";
import { usePayout } from "@/hooks/usePayout";
import { RoundProgress } from "./RoundProgress";
import { ArrowLeftD } from "@/icons/ArrowLeftD";
import type { LedgerProp } from "@/types/index";
import { ArrowDownR } from "@/icons/ArrowDownR";
import { cn } from "@/ui/utils";
import { FlipCard } from "../FlipCard";
import { useHasNewOrder } from "@/hooks/useHasNewOrder";
import {
  AnimationBorderBox,
  AnimationBorderBoxDuration,
} from "../Effect/AnimationBorderBox";

export const OpenRound = ({
  round,
  intervalSeconds,
  ledger,
  positionOpen,
  onPositionOpen,
  paused,
  refetchLedger,
}: {
  round: RoundedData;
  intervalSeconds: number;
  ledger: LedgerProp;
  paused: boolean;
  positionOpen: boolean;
  onPositionOpen: (open: boolean) => void;
  refetchLedger?: () => void;
}) => {
  const [position, setPosition] = useState<BetPosition>(BetPosition.HOUSE);
  const { secondsRemaining } = useCountdown(Number(round.lockTimestamp) ?? 0);
  const countdown = formatRoundTime(secondsRemaining);
  const payout = usePayout(round);
  const [hasNewOrder, setHasNewOrder] = useHasNewOrder();
  const progress = 1 - secondsRemaining / intervalSeconds;
  const ledgerBull = ledger.position === BetPosition.BULL;
  const openStyle = useMemo(
    () =>
      positionOpen
        ? {
            transform: `translate3d(0px, -84px, 0px)`,
            transition: "transform 400ms ease",
          }
        : {
            transform: "translate3d(0px, -0, 0px)",
            transition: "transform 400ms ease",
          },
    [positionOpen]
  );
  useEffect(() => {
    if (hasNewOrder) {
      setTimeout(() => {
        setHasNewOrder(false);
      }, AnimationBorderBoxDuration);
    }
  }, [hasNewOrder, positionOpen, setHasNewOrder]);
  const betEnteredInfo = useMemo(
    () => (
      <AnimationBorderBox run={Boolean(hasNewOrder)} isBull={ledgerBull}>
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
          Position Amount:&nbsp;
          {formatBigIntToFixed(ledger.enterAmount, 4, 18)} BNB
        </p>
      </AnimationBorderBox>
    ),
    [ledger.enterAmount, ledgerBull, hasNewOrder]
  );
  const betButtons = useMemo(
    () => (
      <div className="flex justify-center gap-2 mt-2">
        <Button
          variant="buy"
          className="text-t-white h-12 w-full !rounded-2xl border-b-4"
          onClick={() => {
            setPosition(BetPosition.BULL);
            onPositionOpen(true);
          }}
        >
          Enter UP
        </Button>
        <Button
          variant="sell"
          className="text-t-white h-12 w-full !rounded-2xl border-b-4"
          onClick={() => {
            setPosition(BetPosition.BEAR);
            onPositionOpen(true);
          }}
        >
          Enter DOWN
        </Button>
      </div>
    ),
    [onPositionOpen]
  );
  const newRoundStartInfo = useMemo(
    () => (
      <div className="border-2 border-[#CAC2DB] bg-[#F6F4FB] rounded-xl py-2 font-normal text-base text-[#756595] mt-2">
        New round is starting...
      </div>
    ),
    []
  );
  return (
    <FlipCard
      isFlipped={positionOpen}
      style={openStyle}
      className={cn(positionOpen ? "h-[470px]" : "h-[218px] mdh:h-[238px]")}
    >
      <div
        id="next-round"
        className="rounded-3xl bg-gradient-to-b from-interactive-borderGradientStart to-interactive-borderGradientEnd relative"
      >
        {paused && (
          <div className="left-0 right-0 top-0 bottom-0 absolute bg-t-white/50 rounded-3xl z-10" />
        )}
        <div className="bg-background-bg1 m-0.5 rounded-3xl overflow-hidden">
          <div className="flex justify-between h-10 items-center bg-t-white text-highLight px-4 py-2 mdh:py-4 mdh:h-[56px]">
            {!paused && (
              <>
                <div className="flex gap-1 items-center">
                  {positionOpen && (
                    <ArrowLeftD onClick={onPositionOpen.bind(null, false)} />
                  )}
                  <span className="text-base font-semibold">NEXT</span>
                  <i className="block w-1 h-1 rounded-full bg-highLight" />
                  <span className="text-base font-semibold">{countdown}</span>
                </div>
                <span className="text-base font-normal">
                  #{Number(round.epoch)}
                </span>
              </>
            )}
            {paused && <span>Resume pending</span>}
          </div>

          <>
            <div>
              <RoundProgress
                position={BetPosition.HOUSE}
                round={round}
                stayZero={paused}
                isLive={false}
              />
            </div>
            <div className="relative text-center px-4 pt-4 pb-3 mdh:pb-4">
              <>
                {ledger.hasEntered ? (
                  <span className="text-t-fillSecondary text-base font-semibold">
                    My Position Entered
                  </span>
                ) : (
                  <span className="text-highLight text-base font-semibold">
                    Place My Position
                  </span>
                )}
                {ledger.hasEntered && secondsRemaining > 0 && betEnteredInfo}
                {!ledger.hasEntered && secondsRemaining > 0 && betButtons}
                {secondsRemaining === 0 && newRoundStartInfo}
              </>
              <div className="flex flex-col mt-2 gap-0.5 text-t-secondary text-[14px]">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xs text-t-fillSecondary uppercase">
                    Reward Pool
                  </span>
                  <span className="text-t-primary">
                    {formatBigIntToFixed(
                      round.totalAmount * BigInt(1e4),
                      4,
                      22
                    )}
                    &nbsp;BNB
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xs text-t-fillSecondary">
                    PAYOUT
                  </span>
                  <div className="text-t-primary flex items-center gap-1">
                    <span>UP: {payout.up}x</span>
                    <div className="border-l h-3 border-t-disabled" />
                    <span>DOWN: {payout.down}x</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
      <div
        id="next-round"
        className={cn(
          "rounded-3xl bg-gradient-to-b from-interactive-borderGradientStart to-interactive-borderGradientEnd"
        )}
      >
        <div className="bg-background-bg1 m-0.5 rounded-3xl overflow-hidden">
          <button
            className="flex w-full justify-between h-10 items-center bg-t-white text-highLight px-4 py-2"
            onClick={onPositionOpen.bind(null, false)}
          >
            <div className="flex gap-1 items-center">
              {positionOpen && <ArrowLeftD />}
              <span className="text-base font-semibold">NEXT</span>
              <i className="block w-1 h-1 rounded-full bg-highLight" />
              <span className="text-base font-semibold">{countdown}</span>
            </div>
            <span
              className="text-base font-normal"
              onClick={(e) => e.stopPropagation()}
            >
              #{Number(round.epoch)}
            </span>
          </button>
          <div className="px-4 pb-3 pt-4">
            <BetPositionOrder
              round={round}
              progress={progress}
              position={position}
              setPosition={setPosition}
              open={positionOpen}
              onClose={onPositionOpen.bind(null, false)}
              refetchLedger={refetchLedger}
            />
          </div>
        </div>
      </div>
    </FlipCard>
  );
};
