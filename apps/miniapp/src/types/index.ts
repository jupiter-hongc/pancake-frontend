import { BetPosition, PredictionStatus } from "@/constants";

export interface Bet {
  id?: string;
  hash?: string;
  amount: number;
  position: BetPosition;
  claimed: boolean;
  claimedAt: number;
  claimedBlock: number;
  claimedHash: string;
  claimedBNB: number;
  claimedNetBNB: number;
  createdAt: number;
  updatedAt: number;
  user?: PredictionUser;
  round?: Round;
}

export interface PredictionUser {
  id: string;
  createdAt: number;
  updatedAt: number;
  block: number;
  totalBets: number;
  totalBetsBull: number;
  totalBetsBear: number;
  totalBNB: number;
  totalBNBBull: number;
  totalBNBBear: number;
  totalBetsClaimed: number;
  totalBNBClaimed: number;
  winRate: number;
  averageBNB: number;
  netBNB: number;
  bets?: Bet[];
}

export interface Round {
  id: string;
  epoch: number;
  position: BetPosition;
  failed: boolean;
  startAt: number;
  startBlock: number;
  startHash: string;
  lockAt: number;
  lockBlock: number;
  lockHash: string;
  lockPrice: number;
  lockRoundId: string;
  closeAt: number;
  closeBlock: number;
  closeHash: string;
  closePrice: number;
  closeRoundId: string;
  totalBets: number;
  totalAmount: number;
  bullBets: number;
  bullAmount: number;
  bearBets: number;
  bearAmount: number;
  bets?: Bet[];

  AIPrice?: number;
}

export enum HistoryFilter {
  ALL = "all",
  COLLECTED = "collected",
  UNCOLLECTED = "uncollected",
}

export interface RoundData {
  [key: string]: NodeRound;
}

export interface LedgerData {
  [key: string]: {
    [key: string]: NodeLedger;
  };
}

export interface NodeLedger {
  position: BetPosition;
  amount: string;
  claimed: boolean;
}

export interface NodeRound {
  epoch: number;
  startTimestamp: number | null;
  lockTimestamp: number | null;
  closeTimestamp: number | null;
  lockPrice: string | null;
  closePrice: string | null;
  totalAmount: string;
  bullAmount: string;
  bearAmount: string;
  rewardBaseCalAmount: string;
  rewardAmount: string;
  oracleCalled: boolean;

  // PredictionsV2
  lockOracleId?: string | null;
  closeOracleId?: string | null;

  // AI Predictions
  AIPrice?: string | null;
}

export interface PredictionsState {
  status: PredictionStatus;
  isLoading: boolean;
  isHistoryPaneOpen: boolean;
  isChartPaneOpen: boolean;
  isFetchingHistory: boolean;
  historyFilter: HistoryFilter;
  currentEpoch: number;
  intervalSeconds: number;
  minBetAmount: string;
  bufferSeconds: number;
  history: Bet[];
  totalHistory: number;
  currentHistoryPage: number;
  hasHistoryLoaded: boolean;
  rounds?: RoundData;
  ledgers?: LedgerData;
  claimableStatuses: {
    [key: string]: boolean;
  };
}

export type LedgerProp = {
  epoch: number
  enterAmount: bigint
  hasEntered: boolean
  position: BetPosition
  hasEnteredUp: boolean
  hasEnteredDown: boolean
  hasClaimedUp?: boolean
  hasClaimedDown?: boolean
  ledger:{
    amount: bigint;
    claimed: boolean;
    position: BetPosition;
  };
}