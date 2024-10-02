import { useMemo } from "react";
import { useChainId, useChains } from "wagmi";

export const useNativeDecimal = () => {
  const chains = useChains();
  const chainId = useChainId();
  const chain = useMemo(
    () => chains.find(({ id }) => id === chainId),
    [chainId, chains]
  );
  return chain?.nativeCurrency.decimals || 0
}