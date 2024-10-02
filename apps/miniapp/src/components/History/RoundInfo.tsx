import { BetPosition, PredictionStatus, REWARD_RATE } from "@/constants";
import type { BetRound } from "@/hooks/useGetUserRounds";
import { useNativeDecimal } from "@/hooks/useNativeDecimal";
import { usePayout } from "@/hooks/usePayout";
import usePollOraclePrice from "@/hooks/usePollOraclePrice";
import { usePredictionData } from "@/hooks/usePredictionData";
import { ArrowDownR } from "@/icons/ArrowDownR";
import { Reward } from "@/icons/Reward";
import { TrophyD } from "@/icons/Trophy";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/Accordion";
import { Button } from "@/ui/Button";
import { Separator } from "@/ui/Separator";
import { cn } from "@/ui/utils";
import { getNetPayout, getPriceDifference } from "@/utils/calculate";
import { formatBigIntToFixed } from "@/utils/format";
import { useMemo } from "react";

const HistoryContent = ({
  betRound,
  onClaim,
}: {
  betRound: BetRound;
  onClaim: () => Promise<void>;
}) => {
  const decimal = useNativeDecimal();
  const { price } = usePollOraclePrice();
  const { bet, round, win, canceled } = betRound;
  const roundResult =
    round.closePrice > round.lockPrice
      ? BetPosition.BULL
      : round.closePrice < round.lockPrice
      ? BetPosition.BEAR
      : BetPosition.HOUSE;

  const payout = usePayout(round);
  // Winners get the payout, otherwise the claim what they put it if it was canceled
  const betPayout = win
    ? getNetPayout(betRound, REWARD_RATE)
    : betRound.bet.amount;

  const betDirection = useMemo(
    () => (
      <>
        <dt className="text-preTitle text-t-fillSecondary uppercase">
          Position Direction
        </dt>
        <dd className="text-end">
          <div
            className={cn(
              "rounded-full inline-flex items-center text-t-onColor px-1.5 gap-1",
              bet.position === BetPosition.BULL
                ? "bg-interactive-buy"
                : "bg-interactive-sell"
            )}
          >
            <ArrowDownR
              className={cn(
                "w-3",
                bet.position === BetPosition.BULL ? "rotate-180" : ""
              )}
            />
            {bet.position === BetPosition.BULL ? "Up" : "Down"}
          </div>
        </dd>
      </>
    ),
    [bet.position]
  );
  const cancelInfo = useMemo(
    () => (
      <>
        <dl className="grid grid-cols-[max-content,1fr] gap-y-1 w-full col-span-2 gap-2 items-center">
          <dt className="text-preTitle text-t-fillSecondary uppercase">
            Position amount
          </dt>
          <dd className="text-small text-end">
            {formatBigIntToFixed(bet.amount, 4, decimal)} BNB
          </dd>
          {betDirection}
        </dl>
      </>
    ),
    [bet.amount, betDirection, decimal]
  );
  const winInfo = useMemo(
    () => (
      <>
        {!canceled && (
          <div className="col-span-2 grid grid-cols-2">
            <p className="uppercase text-preTitle text-t-fillSecondary pt-1.5">
              Amount to claim
            </p>

            <div className="text-end">
              <p className="text-h4">
                {formatBigIntToFixed(
                  BigInt(betPayout) + bet.amount,
                  4,
                  decimal
                )}{" "}
                BNB
              </p>
              <p className="text-extraSmall text-t-fillSecondary">
                ~$
                {formatBigIntToFixed(
                  (BigInt(betPayout) + bet.amount) * price,
                  4,
                  decimal + 8
                )}
              </p>
            </div>
          </div>
        )}

        <dl className="grid grid-cols-[max-content,1fr] gap-y-1 w-full col-span-2 gap-2 items-center">
          {!canceled && (
            <>
              <dt className="text-preTitle text-t-fillSecondary uppercase">
                Your Winnings
              </dt>
              <dd className="text-t-buy text-end text-smallBold">
                {betPayout > 0 ? "+" : ""}
                {formatBigIntToFixed(BigInt(betPayout), 4, decimal)}
                &nbsp; BNB
              </dd>
            </>
          )}

          <dt className="text-preTitle text-t-fillSecondary uppercase">
            Position amount
          </dt>
          <dd className="text-small text-end">
            {formatBigIntToFixed(bet.amount, 4, decimal)} BNB
          </dd>
          {betDirection}
        </dl>
      </>
    ),
    [bet.amount, betDirection, betPayout, decimal, price, canceled]
  );
  const lostInfo = useMemo(
    () => (
      <>
        <dl className="grid grid-cols-[max-content,1fr] gap-y-1 w-full col-span-2 gap-2 items-center">
          <dt className="text-preTitle text-t-fillSecondary uppercase">
            <p>Result</p>
            <p>(My Prediction Amount)</p>
          </dt>
          <dd className="text-t-fillSecondary text-end text-bold">
            <p>-{formatBigIntToFixed(BigInt(betPayout), 4, decimal)} BNB</p>
            <p className="text-extraSmall text-t-fillSecondary">
              ~${formatBigIntToFixed(BigInt(betPayout) * price, 4, decimal + 8)}
            </p>
          </dd>

          {betDirection}
        </dl>
      </>
    ),
    [betDirection, betPayout, decimal, price]
  );
  return (
    <div className="py-3 px-4">
      <div className="bg-interactive-interactiveBg border border-b-2 border-border-line rounded-3xl p-4">
        <div className="grid gap-y-2 auto-cols-max grid-cols-2">
          <div className="flex col-span-2 justify-between items-center py-1">
            <p className="text-smallBold text-t-secondary uppercase flex items-center">
              My Prediction Result
            </p>
            <p className="flex items-center justify-end gap-1">
              {!canceled && (
                <>
                  {win ? (
                    <span className="text-h4 text-t-buy">WON</span>
                  ) : roundResult === BetPosition.HOUSE ? (
                    <span className="text-base font-semibold text-t-fillSecondary">
                      Locked Price = Closed price
                    </span>
                  ) : (
                    <span className="text-h4 text-t-fillSecondary">
                      No Luck
                    </span>
                  )}
                  {win && <TrophyD className="text-t-buy w-6 h-6" />}
                </>
              )}
              {canceled && <span className="text-h4 text-t-buy">--</span>}
            </p>
          </div>
          {roundResult === BetPosition.HOUSE && (
            <p className="col-span-2 text-extraSmall text-t-primary py-1">
              The Locked Price & Closed Price are exactly the same (within 8
              decimals), so neither side wins. All funds entered into UP and
              DOWN positions will go to the weekly CAKE burn.
            </p>
          )}
          {!canceled && win && !bet.claimed && (
            <div className="col-span-2">
              <Button
                type="button"
                className="text-bold w-full rounded-2xl h-12"
                onClick={onClaim}
              >
                Claim Winnings
              </Button>
            </div>
          )}
          {canceled && !bet.claimed && (
            <div className="col-span-2">
              <Button
                type="button"
                className="text-bold w-full rounded-2xl h-12"
                onClick={onClaim}
              >
                Reclaim bet amount
              </Button>
            </div>
          )}
          {!canceled && <>{win ? winInfo : lostInfo}</>}
          {canceled && <>{cancelInfo}</>}
        </div>

        <Separator decorative className="my-6" />

        <div className="gap-y-2 auto-cols-max">
          <div className="grid col-span-2">
            <h2 className="text-smallBold text-t-secondary uppercase flex items-center">
              Round History
            </h2>
          </div>
          {!canceled && (
            <div className="flex justify-between items-center mt-2">
              <p
                className={cn("text-h3", {
                  "text-t-buy": roundResult === BetPosition.BULL,
                  "text-t-sell": roundResult === BetPosition.BEAR,
                  "text-t-fillSecondary": roundResult === BetPosition.HOUSE,
                })}
              >
                ${formatBigIntToFixed(round.closePrice, 4, 8)}
              </p>
              {roundResult !== BetPosition.HOUSE && (
                <div
                  className={cn(
                    "flex items-center gap-1 border-2 rounded-full px-1.5",
                    {
                      "border-t-buy text-t-buy":
                        roundResult === BetPosition.BULL,
                      "border-t-sell text-t-sell":
                        roundResult === BetPosition.BEAR,
                    }
                  )}
                >
                  <ArrowDownR
                    className={cn(
                      "w-3",
                      roundResult === BetPosition.BULL ? "rotate-180" : ""
                    )}
                  />
                  <span className="text-body">
                    $
                    {formatBigIntToFixed(
                      getPriceDifference(round.closePrice, round.lockPrice),
                      4,
                      8
                    )}
                  </span>
                </div>
              )}
            </div>
          )}
          {canceled && (
            <div className="mt-2">
              <h4 className="text-base font-semibold text-t-fillSecondary">
                Round Cancelled
              </h4>
              <p className="text-small text-t-fillSecondary mt-1">
                This round cancelled due to price issue
              </p>
            </div>
          )}

          <dl className="grid grid-cols-[max-content,1fr] gap-y-1 w-full col-span-2 gap-2 items-center mt-2">
            <dt className="text-preTitle text-t-fillSecondary uppercase">
              Locked Price
            </dt>
            <dd className="text-t-primary text-end text-small">
              ${formatBigIntToFixed(round.lockPrice, 4, 8)}
            </dd>
            {!canceled && (
              <>
                <dt className="text-preTitle text-t-fillSecondary uppercase">
                  Reward Pool
                </dt>
                <dd className="text-t-primary text-end text-bold">
                  ${formatBigIntToFixed(round.totalAmount, 4, decimal)} BNB
                </dd>
                <dt className="text-preTitle text-t-fillSecondary uppercase">
                  Up Payout
                </dt>
                <dd className="text-t-primary text-small flex items-center justify-end gap-1">
                  <span>{payout.up}x</span>
                  <div className="border-l h-3 border-t-disabled" />
                  <span>
                    {formatBigIntToFixed(round.bullAmount, 4, decimal)}&nbsp;
                    BNB
                  </span>
                </dd>
                <dt className="text-preTitle text-t-fillSecondary uppercase">
                  Down Payout
                </dt>
                <dd className="text-t-primary text-small flex items-center justify-end gap-1">
                  <span>{payout.down}x</span>
                  <div className="border-l h-3 border-t-disabled" />
                  <span>
                    {formatBigIntToFixed(round.bearAmount, 4, decimal)}&nbsp;
                    BNB
                  </span>
                </dd>
              </>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

export const RoundInfo = ({
  betRound,
  onClaim,
}: {
  betRound: BetRound;
  onClaim: () => Promise<void>;
}) => {
  const decimal = useNativeDecimal();
  const {
    data: { currentEpoch, status },
  } = usePredictionData();
  const { bet, round, win, canceled } = betRound;
  const isOpenRound = Number(round.epoch) === currentEpoch;
  const isLiveRound =
    status === PredictionStatus.LIVE &&
    Number(round.epoch) === currentEpoch - 1;
  const isCalculating = !isOpenRound && !isLiveRound && round.closePrice === 0n;
  const liveOrOpen = isOpenRound || isLiveRound || isCalculating;
  const betPayout = win ? getNetPayout(betRound, REWARD_RATE) : bet.amount;

  const formattedPayout = formatBigIntToFixed(BigInt(betPayout), 4, decimal);

  return (
    <AccordionItem
      key={round.epoch.toString()}
      value={round.epoch.toString()}
      asChild
      className="group"
    >
      <div
        className="grid grid-cols-subgrid col-span-4 grid-rows-[2.8125rem_1fr] border-border-line border-b group-data-[status=open]:border-b-0 scroll-m-[3.5625rem]"
        id={`${round.epoch}`}
      >
        <div className="flex items-center pl-4">
          {!liveOrOpen && (
            <AccordionTrigger className="py-0" iconClassName="w-3 h-3">
              <span className="sr-only">#{round.epoch.toString()}</span>
            </AccordionTrigger>
          )}
        </div>

        <div className="text-t-fillSecondary text-small flex items-center">
          #{round.epoch.toString()}
        </div>
        <div
          className={cn(
            "text-smallBold flex items-center gap-1 text-t-fillSecondary",
            {
              "text-t-buy": win && !liveOrOpen && !canceled,
            }
          )}
        >
          {canceled && "Round Cancelled"}
          {!canceled && isOpenRound && "Starting Soon"}
          {!canceled && isLiveRound && "Live Now"}
          {!canceled && isCalculating && "Calculating"}
          {!canceled && !liveOrOpen && (
            <>
              {!win ? "-" : ""}
              {win && betPayout > 0 ? "+" : ""}
              {formattedPayout}
              &nbsp; BNB {win && <Reward className="w-5 h-5" />}
            </>
          )}
        </div>

        <div className="flex justify-end items-center pr-4">
          {win &&
            !bet.claimed &&
            !canceled &&
            !(isOpenRound || isLiveRound) && (
              <Button
                type="button"
                variant={"primary"}
                className="text-bold text-t-white h-6 p-0 px-3"
                onClick={onClaim}
              >
                Claim
              </Button>
            )}
          {canceled && !bet.claimed && (
            <Button
              type="button"
              variant={"primary"}
              className="text-bold text-t-white h-6 p-0 px-3"
              onClick={onClaim}
            >
              Reclaim
            </Button>
          )}
          {(win || canceled) && bet.claimed && (
            <span className="text-t-fillSecondary h-6 p-0 px-1">Claimed</span>
          )}
        </div>

        {!liveOrOpen && (
          <AccordionContent className="col-span-4 [background-image:linear-gradient(139.73deg,#E5FDFF_0%,#F3EFFF_100%)] border-t border-x border-border-line">
            <HistoryContent betRound={betRound} onClaim={onClaim} />
          </AccordionContent>
        )}
      </div>
    </AccordionItem>
  );
};
