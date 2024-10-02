import React from 'react'

export const GeneralInfo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 96 96" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M88 48c0 22.091-17.909 40-40 40S8 70.091 8 48 25.909 8 48 8s40 17.909 40 40z"
      fill="url(#general-info_svg__paint0_linear)"
    />
    <path
      d="M48 19c16.016 0 29 12.984 29 29S64.016 77 48 77 19 64.016 19 48s12.984-29 29-29z"
      fill="url(#general-info_svg__paint1_linear)"
    />
    <path d="M45 30h6v6h-6v-6zM51 42v24h-6V42h6z" fill="#fff" />
    <defs>
      <linearGradient
        id="general-info_svg__paint0_linear"
        x1={8}
        y1={48}
        x2={102.5}
        y2={48}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5CA7F7" stopOpacity={0} />
        <stop offset={1} stopColor="#5CA7F7" />
      </linearGradient>
      <linearGradient
        id="general-info_svg__paint1_linear"
        x1={77}
        y1={48}
        x2={19}
        y2={48}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#328DFD" />
        <stop offset={1} stopColor="#5CA7F7" />
      </linearGradient>
    </defs>
  </svg>
)
