import { useCallback, useEffect, useRef, useState } from "react"

export const useVisibilityChange = (delay = 1000) => {
  const [visible, setVisible] = useState(!document.hidden)
  const onVisibilityChange = useCallback(() => {
    setTimeout(() => {
      setVisible(!document.hidden)
    }, delay);
  }, [delay])
  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [onVisibilityChange])
  return visible
}

export const useVisibilityHiddenCallback = (callback: () => void, delay = 0) => {
  const timerRef = useRef<NodeJS.Timeout>()
  const callbackRef = useRef<() => void>(callback)
  callbackRef.current = callback
  const onVisibilityChange = useCallback(() => {
    window.clearTimeout(timerRef.current)
    if (document.hidden) {
      console.log('delay', delay)
      timerRef.current = setTimeout(() => {
        callbackRef.current()
      }, delay);
    }
  }, [delay])
  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [onVisibilityChange])
}