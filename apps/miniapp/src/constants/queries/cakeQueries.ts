import { BetResponse, RoundResponse, UserResponse } from '../../types/responseType'

export interface UserResponseCAKE extends UserResponse<BetResponseCAKE> {
  totalCAKE: string
  totalCAKEBull: string
  totalCAKEBear: string
  averageCAKE: string
  totalCAKEClaimed: string
  netCAKE: string
}

export interface BetResponseCAKE extends BetResponse {
  claimedCAKE: string
  claimedNetCAKE: string
  user?: UserResponseCAKE
  round?: RoundResponseCAKE
}

export type RoundResponseCAKE = RoundResponse<BetResponseCAKE>

/**
 * Base fields are the all the top-level fields available in the api. Used in multiple queries
 */

export const betBaseFields = `
  id
  hash
  amount
  position
  claimed
  claimedAt
  claimedHash
  claimedBlock
  claimedCAKE
  claimedNetCAKE
  createdAt
  updatedAt
`

export const userBaseFields = `
  id
  createdAt
  updatedAt
  block
  totalBets
  totalBetsBull
  totalBetsBear
  totalCAKE
  totalCAKEBull
  totalCAKEBear
  totalBetsClaimed
  totalCAKEClaimed
  winRate
  averageCAKE
  netCAKE
`
