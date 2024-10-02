import * as React from 'react'

export const BrowserD = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.667" />
    <path
      stroke="currentColor"
      strokeWidth="1.667"
      d="m11.085 6.299 1.8-.033a.833.833 0 0 1 .85.848l-.034 1.8a.833.833 0 0 1-.244.575L9.49 13.457a.834.834 0 0 1-.574.244l-1.8.033a.833.833 0 0 1-.85-.848l.034-1.8a.833.833 0 0 1 .243-.575l3.97-3.969a.833.833 0 0 1 .573-.243Z"
    />
    <circle cx="10" cy="10" r=".833" fill="currentColor" />
  </svg>
)
