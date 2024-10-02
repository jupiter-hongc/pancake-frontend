
import { AnimationBorderBoxDuration } from "@/components/Effect/AnimationBorderBox";
import type { LedgerProp } from "@/types/index";
import { useEffect, useMemo } from "react";
import { useLocalStorage } from "react-use";

type Record = {
  [key: string]: boolean
}
export const useHasLedgerNoticed = ({ epoch, enterAmount, hasEntered } : LedgerProp) => {
  const [temp, setCache] = useLocalStorage('HAS_LEDGER_NOTICED', {} as Record)
  const cache = useMemo(() => temp || {}, [temp])
  const noticed = useMemo(() => cache[`${epoch}`], [cache, epoch])
  useEffect(() => {
    if (!noticed && enterAmount > 0n && hasEntered) {
      setTimeout(() => {
        cache[`${epoch}`] = true
        setCache(cache)
      }, AnimationBorderBoxDuration);
    }
  }, [cache, enterAmount, epoch, hasEntered, noticed, setCache])
  return noticed
}