import { useMemo } from "react";
import { RoundedData } from "./useRoundsData";
import { formatBigIntToFixed } from "@/utils/format";

const MAX_PAYOUT = 0
export const usePayout = (round: RoundedData) => {
  return useMemo(() => ({
    up: round.bullAmount === 0n ? MAX_PAYOUT : formatBigIntToFixed(
      (round.totalAmount * BigInt(1e4)) / (round.bullAmount || 1n),
      2,
      4
    ),
    down: round.bearAmount === 0n
    ? MAX_PAYOUT
    : formatBigIntToFixed(
        (round.totalAmount * BigInt(1e4)) /
          (round.bearAmount || 1n),
        2,
        4
      )
  }), [round])
}
