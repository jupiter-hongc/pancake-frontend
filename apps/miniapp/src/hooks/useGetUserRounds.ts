import { useAccount, useChainId, useConfig } from "wagmi";
import { usePredictionContractConfig } from "./usePreductionContractConfig";
import { Address } from "viem";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useGetUserRoundsLength } from "./useGetUserRoundsLength";
import { readContract, readContracts } from "@wagmi/core";
import { ContractResult, RoundedData } from "./useRoundsData";
import { BetPosition } from "@/constants";
import { getHasRoundFailed } from "@/utils/calculate";
import { usePredictionData } from "./usePredictionData";
import { useEffect } from "react";

export type BetRound = {
  epoch: bigint;
  bet: {
    amount: bigint;
    claimed: boolean;
    position: BetPosition;
  };
  round: RoundedData;
  win: boolean;
  canceled: boolean;
};

const FIRST_PAGE_SIZE = 10 + 2; // 2 means live round and open round which need to filter by history list
const PAGE_SIZE = 10;
function calculateCursorAndSize(pageNumber: number, total: number) {
  let [cursor, size] = [total, PAGE_SIZE];
  if (pageNumber === 1) {
    cursor = total - FIRST_PAGE_SIZE;
    cursor = cursor > 0 ? cursor : 0; // total < FIRST_PAGE_SIZE, e.g. 15, then cursor should be 0
    size = total < FIRST_PAGE_SIZE ? total : FIRST_PAGE_SIZE; // when total < FIRST_PAGE_SIZE, size should be total, e.g. 15, size should be 15
  } else {
    cursor = total - FIRST_PAGE_SIZE - PAGE_SIZE * (pageNumber - 1);
    size = PAGE_SIZE;
    if (cursor < 0) {
      size = PAGE_SIZE + cursor;
      cursor = 0;
    }
  }
  return { cursor: BigInt(cursor), size: BigInt(size) };
}
export const GET_USER_ROUNDS_QUERY_KEY = "user_bet_rounds"
export const useGetUserRounds = () => {
  const { data: total } = useGetUserRoundsLength();
  const { address } = useAccount();
  const chainId = useChainId()
  const {
    data: { currentEpoch, bufferSeconds },
  } = usePredictionData();

  const config = useConfig();
  const contractConfig = usePredictionContractConfig();
  const rest = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [GET_USER_ROUNDS_QUERY_KEY, address, chainId],
    queryFn: async ({ pageParam }) => {
      if (!total) return [];
      const { cursor, size } = calculateCursorAndSize(pageParam, Number(total));
      const [epochs, bets] = await readContract(
        config,
        // @ts-ignore
        {
          ...contractConfig,
          functionName: "getUserRounds",
          args: [address as Address, cursor, size],
        }
      );
      const roundsData = (await readContracts(config, {
        // @ts-ignore
        contracts: epochs.map((epoch) => ({
          ...contractConfig,
          functionName: "rounds",
          args: [epoch] as const,
        })),
      })) as { result: ContractResult; status: "success" | "failure" }[];
      return epochs
        .map((epoch, index) => {
          const round = {
            epoch: roundsData[index]["result"][0],
            startTimestamp: roundsData[index]["result"][1],
            lockTimestamp: roundsData[index]["result"][2],
            closeTimestamp: roundsData[index]["result"][3],
            lockPrice: roundsData[index]["result"][4],
            closePrice: roundsData[index]["result"][5],
            lockOracleId: roundsData[index]["result"][6],
            closeOracleId: roundsData[index]["result"][7],
            totalAmount: roundsData[index]["result"][8],
            bullAmount: roundsData[index]["result"][9],
            bearAmount: roundsData[index]["result"][10],
            rewardBaseCalAmount: roundsData[index]["result"][11],
            rewardAmount: roundsData[index]["result"][12] || 0n,
            oracleCalled: roundsData[index]["result"][13],
          };
          return {
            epoch,
            bet: {
              ...bets[index],
              position:
                bets[index].position === 0
                  ? BetPosition.BULL
                  : BetPosition.BEAR,
            },
            round,
            win: Number(round.epoch) < currentEpoch - 1 &&
              (bets[index].position === 0 && round.closePrice !== 0n &&
                round.closePrice >
                  round.lockPrice)||
              (bets[index].position === 1 && round.closePrice !== 0n &&
                round.closePrice <
                  round.lockPrice),
            canceled: getHasRoundFailed(round, bufferSeconds, Number(round.epoch) >= currentEpoch - 1),
          };
        })
        .filter(Boolean)
        .reverse();
    },
    getNextPageParam: (_, allPages, lastPageParam) => {
      if (
        allPages.reduce((acc, page) => acc + (page?.length ?? 0), 0) ===
        Number(total)
      ) {
        return undefined;
      }
      return lastPageParam + 1;
    },

    enabled: Boolean(address) && (total ?? 0n) > 0n,
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (total || 0 > 0) {
      rest.refetch()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, rest.refetch])
  return rest
};
