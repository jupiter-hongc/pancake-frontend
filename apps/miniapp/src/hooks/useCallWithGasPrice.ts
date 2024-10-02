import { useCallback, useMemo } from "react";
import type { ContractFunctionArgs, ContractFunctionName } from "viem";
import { Abi, Address, CallParameters, WriteContractParameters } from "viem";
import { useGasPrice, useWalletClient } from "wagmi";

export function useCallWithGasPrice() {
  const { data: gasPrice } = useGasPrice();
  const { data: walletClient } = useWalletClient();

  const callWithGasPriceWithSimulate = useCallback(
    async <
      TAbi extends Abi | unknown[],
      functionName extends ContractFunctionName<TAbi, "nonpayable" | "payable">,
      args extends ContractFunctionArgs<
        TAbi,
        "nonpayable" | "payable",
        functionName
      >
    >(
      contract: { abi: TAbi; address: Address } | null,
      methodName: functionName,
      methodArgs?: args,
      overrides?: Omit<CallParameters, "chain" | "to" | "data">
    ): Promise<{ hash: Address }> => {
      if (!contract) {
        throw new Error("No valid contract");
      }
      if (!walletClient) {
        throw new Error("No valid wallet connect");
      }
      const { ...overrides_ } = overrides || {};

      const res = await walletClient.writeContract({
        abi: contract.abi,
        address: contract.address,
        account: walletClient.account,
        functionName: methodName,
        args: methodArgs,
        gasPrice,
        value: 0n,
        ...overrides_,
      } as unknown as WriteContractParameters);

      const hash = res;

      return {
        hash,
      };
    },
    [gasPrice, walletClient]
  );

  return useMemo(
    () => ({ callWithGasPrice: callWithGasPriceWithSimulate }),
    [callWithGasPriceWithSimulate]
  );
}
