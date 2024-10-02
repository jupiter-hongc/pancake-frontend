import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { Config, ReadContractsErrorType } from "@wagmi/core";
import { useAccount, useChainId, useReadContracts } from "wagmi";
import { usePredictionContractAddress } from "./usePredictionContractAddress";
import { useMemo } from "react";
import { predictionsV2ABI } from "@/abis/predictionsV2";

export type ClaimStatusesHookResponse = {
  data: Record<number, boolean>;
  isLoading: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<boolean[], ReadContractsErrorType>
  >;
};
export const useClaimStatuses = (
  epochs: number[]
): ClaimStatusesHookResponse => {
  const chainId = useChainId();
  const { address: account } = useAccount();
  const address = usePredictionContractAddress();

  const { data, isLoading, refetch, isError } = useReadContracts<unknown[], false, Config,(boolean)[]>({
    allowFailure: false,
    contracts: epochs.map(
      (epoch) =>
        ({
          address,
          abi: predictionsV2ABI,
          functionName: "claimable",
          chainId,
          args: [epoch, account] as const,
        } as const)
    ),
  });
  const claimData = useMemo(
    () =>
      (data ?? []).reduce((accum, claimable, index) => {
        const epoch = epochs[index];
        return {
          ...accum,
          [epoch]: claimable,
        };
      }, {} as Record<number, boolean>),
    [data, epochs]
  );
  return useMemo(
    () => ({
      data: claimData,
      isLoading,
      refetch,
      isError,
    }),
    [claimData, isLoading, refetch, isError]
  );
};
