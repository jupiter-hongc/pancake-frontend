'use client'

import { useMediaQuery } from 'react-responsive'

export function useResponsive() {
  const sm = useMediaQuery({ query: 'screen and (min-width: 768px)' })
  const md = useMediaQuery({ query: 'screen and (min-width: 1212px)' })
  const lg = useMediaQuery({ query: 'screen and (min-width: 1440px)' })

  return {
    sm,
    md,
    lg,
  }
}
