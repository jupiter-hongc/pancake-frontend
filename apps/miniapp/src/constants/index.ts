export enum PredictionStatus {
  INITIAL = "initial",
  LIVE = "live",
  PAUSED = "paused",
  ERROR = "error",
}

export enum PredictionSupportedSymbol {
  BNB = 'BNB',
  CAKE = 'CAKE',
  ETH = 'ETH',
  WBTC = 'WBTC',
}

export enum BetPosition {
  BULL = 'Bull',
  BEAR = 'Bear',
  HOUSE = 'House',
}


export const PAST_ROUND_COUNT = 5;
export const FUTURE_ROUND_COUNT = 2;

export const ROUNDS_PER_PAGE = 200;

export const ChainlinkOracleBNBContractAddress = '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE'

export const PollingInterval = 1_000
export const DismissDuration = 4_000
export const ToastedResultCache = new Map();

export const BufferSeconds = 60

export const REWARD_RATE = 0.97
