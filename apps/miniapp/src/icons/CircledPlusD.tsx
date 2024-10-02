import React from 'react'

export const CircledPlusD = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 6a1 1 0 00-1 1v4H7a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V7a1 1 0 00-1-1z" />
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10zm-2 0a8 8 0 10-16 0 8 8 0 0016 0z"
      clipRule="evenodd"
    />
  </svg>
)
