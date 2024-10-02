import {
  getBetBaseFields,
  getRoundBaseFields,
  getUserBaseFields,
} from "@/constants/queries";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type WhereClause = Record<string, string | number | boolean | string[]>;

export const useBetHistory = (
  tokenSymbol: string,
  where: WhereClause = {},
  first = 1000,
  skip = 0,
) => {
  return useQuery({
    queryKey: ["bet-history", tokenSymbol, first, skip, where],
    queryFn: async () => {
      api.post("https://thegraph.pancakeswap.com/prediction-v2-bsc", {
        query: `query getBetHistory($first: Int!, $skip: Int!, $where: Bet_filter) {
        bets(first: $first, skip: $skip, where: $where, orderBy: createdAt, orderDirection: desc) {
          ${getBetBaseFields(tokenSymbol)}
          round {
            ${getRoundBaseFields}
          }
          user {
            ${getUserBaseFields(tokenSymbol)}
          }
        }
      }`,
        variables: {
          first,
          skip,
          where,
        },
      });
    },
  });
};
