import * as React from 'react'

export const Info = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM8.5 5.28116V8.92601H7.5V5.28116H8.5ZM8.5 9.96884V10.7188H7.5V9.96884H8.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
