import React from 'react'

export const NoteDark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 96 96" fill="none" {...props}>
    <g filter="url(#note-dark_svg__filter0_i)">
      <path
        d="M12 20a8 8 0 018-8h31.858a10 10 0 017.07 2.929l9.143 9.142A10 10 0 0171 31.142V76a8 8 0 01-8 8H20a8 8 0 01-8-8V20z"
        fill="url(#note-dark_svg__paint0_linear)"
      />
    </g>
    <path
      d="M20 45.5a2.5 2.5 0 012.5-2.5h15a2.5 2.5 0 010 5h-15a2.5 2.5 0 01-2.5-2.5zM20 57.5a2.5 2.5 0 012.5-2.5h8a2.5 2.5 0 010 5h-8a2.5 2.5 0 01-2.5-2.5zM22.5 67a2.5 2.5 0 000 5h7a2.5 2.5 0 000-5h-7z"
      fill="#F1F8FF"
      fillOpacity={0.6}
    />
    <g filter="url(#note-dark_svg__filter1_i)">
      <path
        d="M72.38 29.65l11.957 11.96-33.21 33.217A4 4 0 0148.3 76H40a2 2 0 01-2-2v-8.302a4 4 0 011.171-2.829l33.21-33.218z"
        fill="url(#note-dark_svg__paint1_linear)"
      />
      <path
        d="M86.837 33.49a3.974 3.974 0 010 5.618l-6.173 6.175-11.942-11.945 6.173-6.174a3.972 3.972 0 015.618 0l6.324 6.325z"
        fill="url(#note-dark_svg__paint2_linear)"
      />
      <path d="M38 68.054v5.973a2 2 0 002 2h5.97L38 68.054z" fill="#F1F8FF" fillOpacity={0.6} />
    </g>
    <defs>
      <linearGradient
        id="note-dark_svg__paint0_linear"
        x1={6.469}
        y1={17.85}
        x2={36.533}
        y2={97.386}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9DA0B7" />
        <stop offset={1} stopColor="#444663" />
      </linearGradient>
      <linearGradient
        id="note-dark_svg__paint1_linear"
        x1={35.327}
        y1={75.999}
        x2={87.63}
        y2={28.414}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EA69FF" />
        <stop offset={1} stopColor="#3E5DFF" />
      </linearGradient>
      <linearGradient
        id="note-dark_svg__paint2_linear"
        x1={70.329}
        y1={31.259}
        x2={74.171}
        y2={40.295}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBE0EA" stopOpacity={0.89} />
        <stop offset={1} stopColor="#D6DDEC" stopOpacity={0.73} />
      </linearGradient>
      <filter
        id="note-dark_svg__filter0_i"
        x={12}
        y={12}
        width={60}
        height={73}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx={1} dy={1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
        <feBlend in2="shape" result="effect1_innerShadow" />
      </filter>
      <filter
        id="note-dark_svg__filter1_i"
        x={38}
        y={26}
        width={51}
        height={51.027}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx={1} dy={1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
        <feBlend in2="shape" result="effect1_innerShadow" />
      </filter>
    </defs>
  </svg>
)
