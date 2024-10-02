import { cn } from "@/ui/utils";
import { RoundedData } from "@/hooks/useRoundsData";
import { useMemo } from "react";
import useIsRefundable from "@/hooks/useIsRefundable";
import { ClaimButton } from "../History/ClaimButton";

export const CanceledRound = ({
  round,
  style,
}: {
  round: RoundedData;
  style?: React.CSSProperties;
}) => {
  const { data: isRefundable, refetch } = useIsRefundable(Number(round.epoch));
  const epochs = useMemo(() => [round.epoch], [round]);
  const learnMore = useMemo(
    () => (
      <a
        className="text-t-link ml-1"
        target="_blank"
        href="https://docs.pancakeswap.finance/products/prediction"
      >
        Learn more
      </a>
    ),
    []
  );
  return (
    <div
      id="canceled-round"
      className={cn(
        "rounded-3xl bg-background-bg1 border overflow-hidden transition-all duration-500 max-h-[215px] border-border-line"
      )}
      style={style}
    >
      <div
        className={cn(
          "flex justify-between h-10 items-center text-t-white px-4 py-2 transition-all bg-[rgb(182,182,182)]"
        )}
      >
        <div className="flex gap-1 items-center">
          <span className="text-t-white text-base font-semibold">
            Round Cancelled
          </span>
        </div>

        <span className="text-t-white text-base font-normal">
          #{Number(round.epoch)}
        </span>
      </div>
      <>
        <div>
          <div className={cn("h-2 bg-[rgb(155,155,155)]")}>
            <div
              className={cn("h-full bg-[rgb(126,126,126)]")}
              style={{ width: "2%" }}
            ></div>
          </div>
        </div>
        <div
          className="mx-auto relative text-center px-4 pt-[45px] pb-[45px] flex flex-col items-center gap-1.5"
          style={{
            background: `linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)`,
          }}
        >
          {!isRefundable && (
            <p className="text-small text-t-primary w-[243px] mb-2.5">
              Sorry this round paused due to price issue, please try visit
              around a while.
              {learnMore}
            </p>
          )}
          {isRefundable && (
            <>
              <p className="text-small text-t-primary  w-[250px] text-center">
                Sorry this round cancelled due to price issue
                {learnMore}
              </p>

              <ClaimButton
                epochs={epochs}
                className="h-[26px] w-[202px] rounded-2xl text-bold text-t-white px-1 mt-0"
                onSuccess={refetch}
              >
                Reclaim my bet amount
              </ClaimButton>
            </>
          )}
        </div>
      </>
    </div>
  );
};
