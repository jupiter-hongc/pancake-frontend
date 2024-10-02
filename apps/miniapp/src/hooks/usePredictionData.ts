import type {
  QueryKey,
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { ReadContractsErrorType } from "@wagmi/core";
import { PredictionStatus } from "@/constants";
import { useMemo } from "react";
import { useReadContracts } from "wagmi";

import { usePredictionContractConfig } from "./usePreductionContractConfig";
import { logger } from "@/lib/logger";

export type PredictionData = {
  status: PredictionStatus;
  currentEpoch: number;
  intervalSeconds: number;
  bufferSeconds: number;
  minBetAmount: string | undefined;
};

const POLL_TIME_IN_SECONDS = 10;

export const usePredictionData = (): {
  queryKey: QueryKey;
  data: PredictionData;
  isLoading: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<
      [bigint, bigint, bigint, boolean, bigint],
      ReadContractsErrorType
    >
  >;
} => {
  const config = usePredictionContractConfig();
  const { data, isLoading, refetch, isError, queryKey } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        ...config,
        functionName: "currentEpoch",
      },
      {
        ...config,
        functionName: "intervalSeconds",
      },
      {
        ...config,
        functionName: "minBetAmount",
      },
      {
        ...config,
        functionName: "paused",
      },
      {
        ...config,
        functionName: "bufferSeconds",
      },
    ],
    query: {
      refetchInterval: POLL_TIME_IN_SECONDS * 1000,
      refetchIntervalInBackground: true,
    },
  });
  const [currentEpoch, intervalSeconds, minBetAmount, paused, bufferSeconds] = useMemo(
    () => data || [],
    [data]
  );
  const predictionData = useMemo(
    () => ({
      status: paused ? PredictionStatus.PAUSED : PredictionStatus.LIVE,
      currentEpoch: Number(currentEpoch || 0),
      intervalSeconds: Number(intervalSeconds || 30),
      minBetAmount: minBetAmount?.toString(),
      bufferSeconds: Number(bufferSeconds),
    }),
    [currentEpoch, intervalSeconds, minBetAmount, paused, bufferSeconds]
  );
  logger.debug(`epoch, ${currentEpoch}`);
  return useMemo(
    () => ({
      queryKey,
      data: predictionData,
      isLoading,
      refetch,
      isError,
    }),
    [queryKey, predictionData, isLoading, refetch, isError]
  );
};
