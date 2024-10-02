import { useMemo } from "react";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { useLedgerData } from "./useLedgerData";
import { usePredictionContractConfig } from "./usePreductionContractConfig";

const useIsRefundable = (epoch: number) => {
  const chainId = useChainId();
  const { address: account } = useAccount();
  const config = usePredictionContractConfig();
  const epochs = useMemo(() => [epoch], [epoch]);
  const { data: refundable, refetch } = useReadContract({
    ...config,
    functionName: "refundable",
    chainId,
    args: [BigInt(epoch), account!] as const,
    query: {
      enabled: Boolean(account),
    },
  });

  const { data: ledger } = useLedgerData(epochs);
  return useMemo(
    () => ({ data: refundable && !ledger[epoch].claimed, refetch }),
    [epoch, ledger, refetch, refundable]
  );
};

export default useIsRefundable;
