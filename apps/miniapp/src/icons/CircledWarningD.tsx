import React from 'react'

export const CircledWarningD = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 15a1 1 0 110 2 1 1 0 010-2zm0-8a1 1 0 011 1v5a1 1 0 11-2 0V8a1 1 0 011-1z" />
    <path
      fillRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z"
      clipRule="evenodd"
    />
  </svg>
)
