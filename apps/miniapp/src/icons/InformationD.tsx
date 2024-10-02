import * as React from 'react'

export const InformationD = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M18 8.5a1 1 0 010 1.414l-5.293 5.293a1 1 0 01-1.414 0L9 12.914 7.414 14.5A1 1 0 016 13.086l2.293-2.293a1 1 0 011.414 0L12 13.086 16.586 8.5A1 1 0 0118 8.5z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M4 7v10h16V7H4zM3 5a1 1 0 00-1 1v12a1 1 0 001 1h18a1 1 0 001-1V6a1 1 0 00-1-1H3z"
        clipRule="evenodd"
      />
    </svg>
  )
}
