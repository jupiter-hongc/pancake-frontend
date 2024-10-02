type EventCbGeneric<EventParams> = { [P in keyof EventParams]: (p: EventParams[P]) => void }
type EventCbsGeneric<EventParams> = { [P in keyof EventParams]: Array<(p: EventParams[P]) => void> }

export class EventEmitter<EventParams> {
  cbs = {} as EventCbsGeneric<EventParams>

  on = <T extends keyof EventParams>(eventName: T, cb: EventCbGeneric<EventParams>[T]) => {
    if (!this.cbs[eventName]) this.cbs[eventName] = []
    this.cbs[eventName].push(cb)

    return () => this.off(eventName, cb)
  }

  off = <T extends keyof EventParams>(eventName: T, cb: EventCbGeneric<EventParams>[T]) => {
    if (!this.cbs[eventName]) this.cbs[eventName] = []
    this.cbs[eventName] = this.cbs[eventName].filter(fn => fn !== cb)
  }

  emit = <T extends keyof EventParams>(eventName: T, params: EventParams[T]) => {
    if (!this.cbs[eventName]) this.cbs[eventName] = []
    this.cbs[eventName].forEach(fn => typeof fn === 'function' && fn(params))
  }
}
