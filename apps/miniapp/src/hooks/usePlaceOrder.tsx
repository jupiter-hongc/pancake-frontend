import { useMutation } from "@tanstack/react-query";

import { usePredictionContractAddress } from "./usePredictionContractAddress";
import { predictionsV2ABI } from "@/abis/predictionsV2";
import { BetPosition, PollingInterval } from "@/constants";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useChainId, useConfig, useWriteContract } from "wagmi";
import { api } from "@/lib/api";

export const usePlaceOrder = () => {
  const address = usePredictionContractAddress();
  const { writeContractAsync } = useWriteContract();
  const config = useConfig();

  return useMutation({
    mutationFn: async (params: {
      amount: bigint;
      position: BetPosition;
      epoch: bigint;
    }) => {
      if (!address) throw new Error("no contract address");

      const betMethod =
        params.position === BetPosition.BULL ? "betBull" : "betBear";

      const hash = await writeContractAsync({
        abi: predictionsV2ABI,
        address,
        functionName: betMethod,
        value: params.amount,
        args: [BigInt(params.epoch)],
      });

      return waitForTransactionReceipt(config, {
        hash,
        pollingInterval: PollingInterval,
        timeout: 30_000,
      });
    },
  });
};

export const useNotifyApiPlaceOrder = () => {
  const chainId = useChainId();
  return useMutation({
    mutationFn: async (params: {
      amount: number;
      position: BetPosition;
      epoch: number;
    }) => {
      return api.post(
        "/prediction/private/v1/placeOrder",
        {},
        {
          params: {
            epoch: params.epoch,
            amount: params.amount,
            side: params.position === BetPosition.BULL ? "UP" : "DOWN",
            chainId,
          },
        }
      );
    },
  });
};
