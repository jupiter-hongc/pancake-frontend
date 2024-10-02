import {
  keepPreviousData,
  type QueryObserverResult,
  type RefetchOptions,
} from "@tanstack/react-query";
import type { Config, ReadContractsErrorType } from "@wagmi/core";
import { useMemo } from "react";
import { useReadContracts } from "wagmi";
import { usePredictionContractConfig } from "./usePreductionContractConfig";

export type RoundedData = {
  epoch: bigint;
  startTimestamp: bigint;
  lockTimestamp: bigint;
  closeTimestamp: bigint;
  lockPrice: bigint;
  closePrice: bigint;
  lockOracleId: bigint;
  closeOracleId: bigint;
  totalAmount: bigint;
  bullAmount: bigint;
  bearAmount: bigint;
  rewardBaseCalAmount: bigint;
  rewardAmount: bigint;
  oracleCalled: boolean;
};

export type ContractResult = readonly [
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  boolean
];
const POLL_TIME_IN_SECONDS = 10;

export const useRoundsData = (
  epochs: number[]
): {
  data: RoundedData[];
  isLoading: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ContractResult[], ReadContractsErrorType>>;
} => {
  const config = usePredictionContractConfig();
  const { data, isLoading, refetch, isError } = useReadContracts<
    unknown[],
    false,
    Config,
    ContractResult[]
  >({
    allowFailure: false,
    contracts: epochs.map(
      (epoch) =>
        ({
          ...config,
          functionName: "rounds",
          args: [epoch] as const,
        } as const)
    ),
    query: {
      refetchInterval: POLL_TIME_IN_SECONDS * 1000,
      refetchIntervalInBackground: true,
      placeholderData: keepPreviousData,
    },
  });
  const roundedData = useMemo(
    () =>
      (data ?? []).map((r) => ({
        epoch: r[0],
        startTimestamp: r[1],
        lockTimestamp: r[2],
        closeTimestamp: r[3],
        lockPrice: r[4],
        closePrice: r[5],
        lockOracleId: r[6],
        closeOracleId: r[7],
        totalAmount: r[8],
        bullAmount: r[9],
        bearAmount: r[10],
        rewardBaseCalAmount: r[11],
        rewardAmount: r[12] || 0n,
        oracleCalled: r[13],
      })),
    [data]
  );

  return useMemo(
    () => ({
      data: roundedData,
      isLoading,
      refetch,
      isError,
    }),
    [roundedData, isLoading, refetch, isError]
  );
};
