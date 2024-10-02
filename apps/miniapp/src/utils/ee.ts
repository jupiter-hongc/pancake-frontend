import { EventEmitter } from './eventEmitter'

export type EventParams = {
  CONNECT_WALLET: undefined
  TOGGLE_POSITION: undefined
}
export const ee = new EventEmitter<EventParams>()
