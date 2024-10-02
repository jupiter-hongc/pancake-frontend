import type { LedgerProp } from "@/types/index";
import { RoundedData } from "./useRoundsData";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import {
  BetPosition,
  DismissDuration,
  REWARD_RATE,
  ToastedResultCache,
} from "@/constants";
import { Reward } from "@/icons/Reward";
import { Button } from "@/ui/Button";
import { Link } from "@tanstack/react-router";
import { ArrowDownR } from "@/icons/ArrowDownR";
import { formatBigIntToFixed } from "@/utils/format";
import { cn } from "@/ui/utils";
import { getHasRoundFailed, getNetPayout } from "@/utils/calculate";
import { usePredictionData } from "./usePredictionData";

export const useNotificationResult = (
  pastLedger: LedgerProp,
  pastRound: RoundedData,
  price: bigint
) => {
  const {
    data: { bufferSeconds, currentEpoch },
  } = usePredictionData();
  const pastLedgerRef = useRef(pastLedger);
  const pastRoundRef = useRef(pastRound);
  const priceRef = useRef(price);
  const winButtonRef = useRef<HTMLButtonElement>(null);
  pastLedgerRef.current = pastLedger;
  pastRoundRef.current = pastRound;
  priceRef.current = price;
  const betRound = useMemo(
    () =>
      pastRound &&
      pastLedger && {
        epoch: pastRound.epoch,
        bet: {
          ...pastLedger.ledger,
          position: pastLedger.position,
        },
        round: pastRound,
        win:
          (Number(pastRound.epoch) < currentEpoch - 1 &&
            pastLedger.position === BetPosition.BULL &&
            pastRound.closePrice !== 0n &&
            pastRound.closePrice > pastRound.lockPrice) ||
          (pastLedger.position === BetPosition.BEAR &&
            pastRound.closePrice !== 0n &&
            pastRound.closePrice < pastRound.lockPrice),
        canceled: getHasRoundFailed(
          pastRound,
          bufferSeconds,
          Number(pastRound.epoch) >= currentEpoch - 1
        ),
      },
    [bufferSeconds, currentEpoch, pastRound, pastLedger]
  );
  // Winners get the payout, otherwise the claim what they put it if it was canceled
  const betPayout = betRound?.win
    ? getNetPayout(betRound, REWARD_RATE)
    : betRound?.bet?.amount;

  const winToast = useCallback(
    (onClick: () => void) => (
      <div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1">
              <Reward className="w-6 h-6" />
              <h2 className="text-h4 text-t-buy">WON</h2>
            </div>
            <p className="text-extraSmall text-t-fillSecondary">
              Last round #{Number(pastRoundRef.current.epoch)}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <h4 className="text-bold text-[#1BC59C]">
              +
              {formatBigIntToFixed(
                BigInt(betPayout) + pastLedgerRef.current.enterAmount,
                4,
                18
              )}{" "}
              BNB
            </h4>
            <p className="text-extraSmall text-t-fillSecondary">
              ~$
              {formatBigIntToFixed(
                (BigInt(betPayout) + pastLedgerRef.current.enterAmount) *
                  priceRef.current,
                4,
                18 + 8
              )}
            </p>
          </div>
        </div>
        <Link to="/history" className="">
          <Button
            variant="primary"
            className="text-t-white h-12 w-full !rounded-2xl border-b-4 mt-2 text-bold !font-semibold"
            onClick={onClick}
            ref={winButtonRef}
          >
            Claim your winnings
          </Button>
        </Link>
      </div>
    ),
    [betPayout]
  );
  const lostToast = useCallback(
    () => (
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-h4 text-t-fillSecondary">No Luck</h2>
            <div className="flex items-center gap-1">
              <p className="text-extraSmall text-t-fillSecondary">
                #{Number(pastRoundRef.current.epoch)}
              </p>
              <div className="flex items-center gap-0.5">
                {pastRoundRef.current.closePrice >
                pastRoundRef.current.lockPrice ? (
                  <ArrowDownR className="w-2.5 h-2.5 rotate-180 text-t-buy" />
                ) : (
                  <ArrowDownR className="w-2.5 h-2.5 text-t-sell" />
                )}
                <div
                  className={cn(
                    "text-smallBold",
                    pastRoundRef.current.closePrice >
                      pastRoundRef.current.lockPrice
                      ? "text-t-buy"
                      : "text-t-sell"
                  )}
                >
                  ${formatBigIntToFixed(pastRoundRef.current.closePrice, 4, 8)}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center text-smallBold text-t-fillSecondary gap-1">
              <h4 className="text-smallBold text-t-fillSecondary">
                My Position:
              </h4>
              {pastLedgerRef.current.hasEnteredUp ? (
                <div className="flex items-center gap-0.5">
                  <span>Up</span>
                  <ArrowDownR className="w-2.5 h-2.5" />
                </div>
              ) : (
                <div className="flex items-center gap-0.5">
                  <span>Down</span>
                  <ArrowDownR className="w-2.5 h-2.5 rotate-180" />
                </div>
              )}
            </div>
            <p className="text-extraSmall text-t-fillSecondary">
              Position:&nbsp;
              {formatBigIntToFixed(betPayout, 4, 18)}
              &nbsp; BNB
            </p>
          </div>
        </div>
      </div>
    ),
    [betPayout]
  );
  const burnToast = useCallback(
    () => (
      <div>
        <h2 className="text-h4 text-t-fillSecondary">
          Locked Price = Closed price
        </h2>
        <div className="flex items-center gap-1">
          <span className="text-extraSmall text-t-fillSecondary">
            #{Number(pastRoundRef.current.epoch)}
          </span>
          <span className="text-smallBold text-t-fillSecondary">
            ${formatBigIntToFixed(pastRoundRef.current.closePrice, 4, 8)}
          </span>
        </div>
        <p className="mt-2 text-extraSmall text-t-primary">
          All funds entered into UP and DOWN positions will go to the weekly
          CAKE burn.
        </p>
      </div>
    ),
    []
  );

  useEffect(() => {
    if (!pastRound) return;
    if (pastLedger.enterAmount === 0n) return;
    if (ToastedResultCache.has(Number(pastRoundRef.current.epoch))) return;
    if (
      (pastLedger.hasEnteredUp && pastRound.closePrice > pastRound.lockPrice) ||
      (pastLedger.hasEnteredDown && pastRound.closePrice < pastRound.lockPrice)
    ) {
      const toastId = toast(
        winToast(() => {
          toast.dismiss(toastId);
        }),
        {
          duration: DismissDuration,
        }
      );
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 60,
          origin: {
            x: 0.5,
            y: 0.4,
          },
          zIndex: 999999999,
        });
      }, 500);
      ToastedResultCache.set(Number(pastRoundRef.current.epoch), true);
    } else if (
      (pastLedger.hasEnteredUp && pastRound.closePrice < pastRound.lockPrice) ||
      (pastLedger.hasEnteredDown && pastRound.closePrice > pastRound.lockPrice)
    ) {
      toast(lostToast(), {
        duration: DismissDuration,
      });
      ToastedResultCache.set(Number(pastRoundRef.current.epoch), true);
    } else if (
      pastLedger.hasEntered &&
      pastRound.closePrice === pastRound.lockPrice
    ) {
      toast(burnToast(), {
        duration: DismissDuration,
      });
      ToastedResultCache.set(Number(pastRoundRef.current.epoch), true);
    }
  }, [
    lostToast,
    pastLedger,
    pastRound,
    pastRound?.closePrice,
    pastRound?.lockPrice,
    winToast,
    burnToast,
  ]);
};
