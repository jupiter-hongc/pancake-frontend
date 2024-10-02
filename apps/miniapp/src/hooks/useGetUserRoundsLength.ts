import { useAccount, useReadContract } from "wagmi";
import { usePredictionContractConfig } from "./usePreductionContractConfig";
import { Address } from "viem";

export const useGetUserRoundsLength = () => {
  const config = usePredictionContractConfig();
  const { address } = useAccount();

  return useReadContract({
    ...config,
    functionName: "getUserRoundsLength",
    args: [address as Address],
    query: {
      enabled: Boolean(address),
    },
  });
};
