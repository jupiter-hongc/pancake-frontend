import React from 'react'

export const HotD = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M5.85 19.952a8.698 8.698 0 010-12.301l5.443-5.444a1 1 0 011.414 0l5.444 5.444A8.698 8.698 0 015.849 19.952zm11.265-1.825a5.17 5.17 0 00-1.453-4.466l-2.955-2.954a1 1 0 00-1.414 0L8.34 13.661a5.17 5.17 0 00-1.454 4.466 6.7 6.7 0 01.379-9.062L12 4.328l4.737 4.737a6.699 6.699 0 01.379 9.062zM12 20.5a3.178 3.178 0 002.247-5.425L12 12.83l-2.246 2.246A3.178 3.178 0 0012 20.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}
