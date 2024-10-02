import { getNowInSeconds } from '@/utils/calculate'
import { useCallback, useEffect, useRef, useState } from 'react'
import useIsWindowVisible from './useIsWindowVisible'
import { accurateSecondTimer } from '@/utils/accurateTimer'

const getSecondsRemainingToNow = (timestamp: number, negative = false) => {
  const now = getNowInSeconds()
  if (negative) {
    return Number.isFinite(timestamp) ? timestamp - now : 0
  }
  return Number.isFinite(timestamp) && timestamp > now ? timestamp - now : 0
}

/**
 * Consider this moving up to the global level
 */
const useCountdown = (timestamp: number, negative: boolean = false) => {
  const timerCancelRef = useRef<(() => void) | null>(null)
  const [secondsRemaining, setSecondsRemaining] = useState(() => getSecondsRemainingToNow(timestamp, negative))
  const [isPaused, setIsPaused] = useState(false)
  const isWindowVisible = useIsWindowVisible()

  const pause = useCallback(() => setIsPaused(true), [setIsPaused])
  const unpause = useCallback(() => setIsPaused(false), [setIsPaused])

  useEffect(() => {
    if (!isPaused) {
      timerCancelRef.current = accurateSecondTimer(() => {
        setSecondsRemaining((prevSecondsRemaining) => {
          if (prevSecondsRemaining) {
            return prevSecondsRemaining - 1
          }
          timerCancelRef.current?.()
          return prevSecondsRemaining
        })
      })
    }

    return () => {
      timerCancelRef.current?.()
    }
  }, [isPaused, timestamp, setSecondsRemaining])

  // Pause the timer if the tab becomes inactive to avoid it becoming out of sync
  useEffect(() => {
    if (isWindowVisible) {
      setSecondsRemaining(getSecondsRemainingToNow(timestamp, negative))
      unpause()
    } else {
      pause()
    }
  }, [pause, unpause, timestamp, setSecondsRemaining, isWindowVisible, negative])

  return { secondsRemaining, pause, unpause }
}

export default useCountdown
