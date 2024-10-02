import { useCallback, useMemo } from "react";
import { predictionsV2ABI } from "@/abis/predictionsV2";
import { usePredictionContractAddress } from "./usePredictionContractAddress";
import { useWriteContract } from "wagmi";

export const useClaim = () => {
  const address = usePredictionContractAddress();

  const { writeContractAsync, isPending, data } = useWriteContract()
  const claim = useCallback(async (epochs: bigint[]) => {
    if (!address) throw new Error("no contract address");
    return writeContractAsync(
      {
        abi: predictionsV2ABI,
        address,
        functionName: 'claim',
        args:[epochs]
      },
    );
  }, [address, writeContractAsync]);
  return useMemo(() => ({
    claim,
    data, 
    isPending
  }), [claim, data, isPending])
};
