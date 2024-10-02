import { BetPosition, BufferSeconds } from "@/constants";
import type { BetRound } from "@/hooks/useGetUserRounds";
import { RoundedData } from "@/hooks/useRoundsData";

export const getPriceDifference = (
  price: bigint | null,
  lockPrice: bigint | null
) => {
  if (!price || !lockPrice) {
    return 0n;
  }
  return price - lockPrice;
};

export const getNowInSeconds = () => Math.floor(Date.now() / 1000);

export const getHasRoundFailed = (
  round: RoundedData,
  bufferSeconds: number = BufferSeconds,
  isLiveRound: boolean
) => {
  const { closePrice, oracleCalled, closeTimestamp } = round;
  if (closePrice === 0n && !isLiveRound) {
    return true;
  }
  if (!oracleCalled || !closeTimestamp) {
    const closeTimestampMs = (Number(closeTimestamp) + bufferSeconds) * 1000;

    if (Number.isFinite(closeTimestampMs)) {
      return Date.now() > closeTimestampMs;
    }
  }

  return false;
};
// @ts-ignore
window.getHasRoundFailed = getHasRoundFailed

export const getMultiplier = (total: bigint, amount: bigint) => {
  if (total <= 0n || amount <= 0n) {
    return 0n;
  }

  return (total * 10n ** 18n) / amount;
};

/**
 * Calculates the total payout given a bet
 */
export const getPayout = (bet: BetRound, rewardRate = 1) => {
  if (!bet || !bet.round) {
    return 0n;
  }

  const { bullAmount, bearAmount, totalAmount } = bet.round;

  const multiplier = getMultiplier(
    totalAmount,
    bet.bet.position === BetPosition.BULL ? bullAmount : bearAmount
  );

  return (
    (bet.bet.amount * multiplier * BigInt(rewardRate * 100)) / 100n / 10n ** 18n
  );
};

// 0.0002 BNB * 1 * 0.97 - 0.0002 BNB =
export const getNetPayout = (bet: BetRound, rewardRate = 1) => {
  if (!bet || !bet.round) {
    return 0n;
  }

  const payout = getPayout(bet, rewardRate);
  return payout - bet.bet.amount;
};
