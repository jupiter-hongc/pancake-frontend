import { Reward } from "@/icons/Reward";
import { useMemo } from "react";

import type { BetRound } from "@/hooks/useGetUserRounds";
import { getNetPayout } from "@/utils/calculate";
import { formatBigIntToFixed } from "@/utils/format";
import { useNativeDecimal } from "@/hooks/useNativeDecimal";
import { ClaimButton } from "./ClaimButton";
import { REWARD_RATE } from "@/constants";
import { NoResponseReload } from "../NoResponseReload";

export interface Props {
  betRounds: BetRound[];
  onClose: () => void;
}

export const ClaimModal = ({ betRounds, onClose }: Props) => {
  const decimal = useNativeDecimal();
  const epochs = useMemo(() => betRounds.map((i) => i.epoch), [betRounds]);
  const total = useMemo(
    () =>
      betRounds.reduce((p, c) => {
        if (c.canceled) return c.bet.amount + p;
        const v = BigInt(getNetPayout(c, REWARD_RATE));
        return v + c.bet.amount + p;
      }, 0n),
    [betRounds]
  );
  const isAllReClaim = betRounds.every((i) => i.canceled);

  return (
    <>
      <div className="flex items-center">
        {!isAllReClaim && <Reward className="w-4 h-4" />}
        <h2 className="uppercase text-preTitle text-t-secondary">
          {epochs.length === 1
            ? `Claiming from round`
            : `Claiming from ${epochs.length} rounds`}
        </h2>
      </div>
      <div className="flex items-center flex-wrap gap-2 gap-y-0 mt-2 text-small text-t-fillSecondary">
        {epochs.map((i, index) => (
          <div>
            #{i.toString()}
            {index < epochs.length - 1 ? "," : ""}
          </div>
        ))}
      </div>
      <h2 className="uppercase text-preTitle text-t-secondary mt-5">Total</h2>
      <p className="text-h4 text-t-buy">
        {total > 0n ? "+" : ""}
        {formatBigIntToFixed(total, 4, decimal)}&nbsp;BNB
      </p>
      <ClaimButton epochs={epochs} onSuccess={onClose}>
        {epochs.length === 1 ? "Claim" : "Claim All"}
      </ClaimButton>
      <NoResponseReload />
    </>
  );
};
