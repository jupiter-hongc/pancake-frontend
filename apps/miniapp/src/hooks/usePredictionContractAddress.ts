import { type Address } from "viem";
import { bsc, bscTestnet } from "viem/chains";
import { useChainId } from "wagmi";

const AddressMap = new Map<number, Address>([
  [bsc.id, "0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA"],
  [bscTestnet.id, "0x7a6A0b579eb7Ed5c9C779703835ea848893DAC3a"],
]);

export const usePredictionContractAddress = () => {
  const chainId = useChainId();
  return AddressMap.get(chainId);
};