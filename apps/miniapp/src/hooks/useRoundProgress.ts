import { usePredictionData } from "./usePredictionData";
import type { RoundedData } from "./useRoundsData";

export const useRoundProgress = (round: RoundedData, isLive: boolean) => {
  const {
    data: { intervalSeconds},
  } = usePredictionData();
  if (!round) return 0
  const { startTimestamp, closeTimestamp  } = round
  const startMs = isLive ? Number(closeTimestamp - BigInt(intervalSeconds)) * 1000 : Number(startTimestamp) * 1000;
  const now = Date.now();
  const rawProgress = ((now - startMs) / (intervalSeconds * 1000)) * 100;
  return rawProgress <= 100 ? rawProgress : 100;
}