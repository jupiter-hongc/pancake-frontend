import { chainlinkOracleABI } from "@/abis/chainlinkOracle";
import { ChainlinkOracleBNBContractAddress } from "@/constants";
import { useReadContract } from "wagmi";
import { bsc } from "wagmi/chains";

const POLL_TIME_IN_SECONDS = 5;
const usePollOraclePrice = () => {
  const { data = 0n, refetch } = useReadContract({
    abi: chainlinkOracleABI,
    address: ChainlinkOracleBNBContractAddress,
    functionName: "latestAnswer",
    chainId: bsc.id, // MUST BE MAINNET CONTRACT
    query: {
      refetchInterval: POLL_TIME_IN_SECONDS * 1000,
      refetchIntervalInBackground: true,
    },
  });
  return {
    price: data,
    refresh: refetch,
  };
};

export default usePollOraclePrice;
