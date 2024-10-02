import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { Config, ReadContractsErrorType } from "@wagmi/core";
import { usePredictionContractAddress } from "./usePredictionContractAddress";
import { useAccount, useChainId, useReadContracts } from "wagmi";
import { predictionsV2ABI } from "@/abis/predictionsV2";
import { useMemo } from "react";
import { BetPosition } from "@/constants";

export type LedgerData = {
  position: BetPosition;
  amount: bigint;
  claimed: boolean;
};

export type LedgerHookResponse = {
  data: Record<number, LedgerData>;
  isLoading: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<
      (readonly [number, bigint, boolean])[],
      ReadContractsErrorType
    >
  >;
};
export const useLedgerData = (epochs: number[]): LedgerHookResponse => {
  const chainId = useChainId();
  const { address: account } = useAccount();
  const address = usePredictionContractAddress();
  const { data, isLoading, refetch, isError } = useReadContracts<
    unknown[],
    false,
    Config,
    (readonly [number, bigint, boolean])[]
  >({
    allowFailure: false,
    contracts: epochs.map((epoch) => ({
      address,
      abi: predictionsV2ABI,
      functionName: "ledger",
      chainId,
      args: [BigInt(epoch), account] as const,
    })),
  });
  const ledgerData = useMemo(
    () =>
      (data ?? []).reduce(
        (p, r, index) => ({
          ...p,
          [epochs[index]]: {
            position: r[0] as 1 | 0 === 0 ? BetPosition.BULL : BetPosition.BEAR,
            amount: r[1],
            claimed: r[2],
          },
        }),
        {}
      ),
    [data, epochs]
  );
  return useMemo(
    () => ({
      data: ledgerData,
      isLoading,
      refetch,
      isError,
    }),
    [ledgerData, isLoading, refetch, isError]
  );
};
