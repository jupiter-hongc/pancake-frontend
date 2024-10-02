import range from "lodash.range";

import { BetPosition, PAST_ROUND_COUNT, PredictionStatus } from "@/constants";
import { usePredictionData } from "@/hooks/usePredictionData";
import { useRoundsData } from "@/hooks/useRoundsData";
import { useCallback, useMemo } from "react";
import usePollOraclePrice from "@/hooks/usePollOraclePrice";
import { LiveRound } from "./LiveRound";
import { OpenRound } from "./OpenRound";
import { BNBSvg } from "@/icons/BNB";
import { LastRounds } from "./LastRound";
import { HeaderEndPortal, HeaderStartPortal } from "../Header";
import { useLedgerData } from "@/hooks/useLedgerData";
import { useNotificationResult } from "@/hooks/useNotificationResult";
import type { LedgerProp } from "@/types/index";
import { createLazyRoute } from "@tanstack/react-router";
import { cn } from "@/ui/utils";
import useCountdown from "@/hooks/useCountdown";
import { useVisibilityHiddenCallback } from "@/hooks/useVisibilityChange";
import { useQueryClient } from "@tanstack/react-query";
import { LaterRound } from "./LaterRound";
import { useToggle } from "react-use";

const Prediction = () => {
  const queryClient = useQueryClient();
  const [positionOpen, togglePositionOpen] = useToggle(false);
  const {
    data: { currentEpoch, intervalSeconds, bufferSeconds, status },
    refetch: refreshPredictionData,
    queryKey,
  } = usePredictionData();
  const epochs = useMemo(
    () =>
      currentEpoch > PAST_ROUND_COUNT
        ? range(currentEpoch, currentEpoch - PAST_ROUND_COUNT)
        : [currentEpoch],
    [currentEpoch]
  );
  const { data: rounds, refetch: refetchRoundsData } = useRoundsData(epochs);

  const ledgerCheckEpochList = useMemo(
    () => [currentEpoch - 2, currentEpoch - 1, currentEpoch],
    [currentEpoch]
  );
  const { data: ledgerMap, refetch: refetchLedger } =
    useLedgerData(ledgerCheckEpochList);
  const { price } = usePollOraclePrice();
  const [pastLedger, liveLedger, currentLedger] = useMemo(
    () =>
      ledgerCheckEpochList.map((epoch) => {
        const ledger = ledgerMap?.[epoch];
        const hasEntered = ledger ? ledger.amount > 0n : false;

        const hasEnteredUp =
          hasEntered && ledger?.position === BetPosition.BULL;
        const hasEnteredDown =
          hasEntered && ledger?.position === BetPosition.BEAR;
        return {
          epoch,
          enterAmount: ledger?.amount || 0n,
          position: ledger?.position,
          hasEntered,
          hasEnteredUp,
          hasEnteredDown,
          ledger,
        } as LedgerProp;
      }),
    [ledgerCheckEpochList, ledgerMap]
  );
  const tempRounds = useMemo(() => [...rounds], [rounds]);
  const currentRound = useMemo(() => tempRounds.shift(), [tempRounds]);
  const liveRound = useMemo(() => tempRounds.shift(), [tempRounds]);
  const historyRounds = useMemo(() => tempRounds, [tempRounds]);
  const { secondsRemaining } = useCountdown(
    Number(currentRound?.lockTimestamp) ?? 0,
    true
  );
  const lastSeconds = secondsRemaining + bufferSeconds - 10;
  useVisibilityHiddenCallback(
    useCallback(() => {
      queryClient.removeQueries({ queryKey, exact: true });
      refreshPredictionData();
    }, [queryClient, queryKey, refreshPredictionData]),
    (lastSeconds > 0 ? lastSeconds : 0) * 1e3 // need 10s to refetch rounds data
  );
  useNotificationResult(
    pastLedger,
    historyRounds.find((x) => Number(x.epoch) === ledgerCheckEpochList[0])!,
    price
  );
  const onOrderConfirmed = useCallback(() => {
    refetchLedger();
    refetchRoundsData();
  }, [refetchLedger, refetchRoundsData]);
  return (
    <>
      <HeaderStartPortal>
        <h1 className="text-h4 text-t-inverse">Prediction</h1>
      </HeaderStartPortal>
      <HeaderEndPortal>
        <div className="flex items-center rounded-full py-1 px-1 pr-3 h-[38px] bg-interactive-interactiveBg">
          <BNBSvg className="w-[30px] h-[30px]" />
          <span className="ml-2 text-xl font-semibold">BNBUSD</span>
          <div className="border-l border-t-disabled mx-1.5 h-4" />
          <span className="text-base font-semibold">5min</span>
        </div>
      </HeaderEndPortal>
      <link
        rel="preload"
        href="https://assets.pancakeswap.finance/web/pancake-3d-spinner-v2.gif"
        as="image"
      />
      <div
        className={cn(
          "flex flex-col gap-2.5 smh:gap-4 px-4 smw:px-6 pt-0 smh:pt-4",
          positionOpen && "smh:gap-6 smh:pt-4 pt-4 gap-5"
        )}
      >
        {historyRounds.length > 0 && (
          <LastRounds rounds={historyRounds} positionOpen={positionOpen} />
        )}
        {liveRound && (
          <LiveRound
            price={price}
            round={liveRound}
            betPosition={
              price > liveRound.lockPrice ? BetPosition.BULL : BetPosition.BEAR
            }
            positionOpen={positionOpen}
            onPositionOpen={togglePositionOpen}
            ledger={liveLedger}
            paused={status === PredictionStatus.PAUSED}
          />
        )}
        {currentRound && liveRound && (
          <OpenRound
            round={currentRound}
            intervalSeconds={intervalSeconds}
            ledger={currentLedger}
            positionOpen={positionOpen}
            onPositionOpen={togglePositionOpen}
            refetchLedger={onOrderConfirmed}
            paused={status === PredictionStatus.PAUSED}
          />
        )}
        {currentRound && liveRound && !positionOpen && (
          <LaterRound round={currentRound} increase={1} />
        )}
      </div>
    </>
  );
};

export default Prediction;

export const Route = createLazyRoute("/prediction-layout/predictions")({
  component: Prediction,
});
