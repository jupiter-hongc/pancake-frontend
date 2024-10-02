import * as React from 'react'

export const CircledCheckmarkD = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M6.884 11.296a.998.998 0 000 1.41l2.82 2.826a1 1 0 001.414.001l5.544-5.536a1.003 1.003 0 00-1.42-1.42L10.41 13.41l-2.115-2.115a.998.998 0 00-1.41 0z" />
      <path
        fillRule="evenodd"
        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm2 0a8 8 0 1116 0 8 8 0 01-16 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}
