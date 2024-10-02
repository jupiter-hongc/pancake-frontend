import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"

const state = {
  newOrder: false
} as const
const QueryKey = ['new-order-state']
export const useHasNewOrder = (): [boolean | undefined, (v: boolean, delay?: number)=>void] => {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: QueryKey,
    queryFn: () => state,
    staleTime: Infinity,
  })
  const update = useCallback((newOrder: boolean, delay?: number) => {
    setTimeout(() => {
      queryClient.setQueryData(QueryKey, (old: typeof state) => ({ ...old, newOrder }))
    }, delay || 0);
  }, [queryClient])
  return useMemo(() => [data?.newOrder, update], [data, update])
}