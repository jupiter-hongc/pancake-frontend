import { useMemo } from "react";
import { useChainId } from "wagmi";
import { usePredictionContractAddress } from "./usePredictionContractAddress";
import { predictionsV2ABI } from "@/abis/predictionsV2";

export const usePredictionContractConfig = () => {
  const chainId = useChainId();
  const address = usePredictionContractAddress();
  return useMemo(
    () => ({ chainId, address, abi: predictionsV2ABI } as const),
    [address, chainId]
  );
};
