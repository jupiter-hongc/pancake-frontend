import CountUp from "react-countup";
import { BetPosition } from "@/constants";
import { useMemo } from "react";
import { formatBigIntToFixed } from "@/utils/format";
import { cn } from "@/ui/utils";

export type LivePriceProps = {
  price: number | bigint;
  betPosition: BetPosition;
  className?: string;
};

export const LivePrice = ({
  price,
  betPosition,
  className,
}: LivePriceProps) => {
  const priceAsNumber = useMemo(
    () =>
      price
        ? typeof price === "number"
          ? price
          : parseFloat(formatBigIntToFixed(price, 4, 8))
        : 0,
    [price]
  );
  const priceColor = useMemo(() => {
    switch (betPosition) {
      case BetPosition.BULL:
        return "text-t-buy";
      case BetPosition.BEAR:
        return "text-t-sell";
      case BetPosition.HOUSE:
      default:
        return "text-t-primary";
    }
  }, [betPosition]);
  return (
    <CountUp
      start={0}
      preserveValue
      delay={0}
      end={priceAsNumber}
      prefix="$"
      decimals={4}
      duration={1}
    >
      {({ countUpRef }) => (
        <span
          className={cn("text-[40px] font-semibold ", priceColor, className)}
          ref={countUpRef}
        />
      )}
    </CountUp>
  );
};
