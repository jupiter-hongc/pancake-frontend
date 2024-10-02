import React from 'react'

export const GeneralWarning = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="icon-warn css-aenbdp"
    viewBox="0 0 96 96"
    {...props}
  >
    <g filter="url(#a)">
      <rect width="65" height="65" x="8" y="9" fill="url(#b)" rx="10" />
    </g>
    <g filter="url(#c)">
      <rect width="58" height="58" x="30" y="31" fill="#F1F8FF" fillOpacity=".5" rx="8" />
    </g>
    <g filter="url(#d)">
      <rect width="38" height="38" x="40" y="41" fill="#fff" rx="19" />
    </g>
    <g filter="url(#e)">
      <path
        fill="#F0B90B"
        fillRule="evenodd"
        d="M62 51c0-1.105-1-3-3-3s-3 1.895-3 3l1 13a2 2 0 1 0 4 0l1-13zm-3 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <filter id="a" width="66" height="66" x="8" y="9" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.45 0" />
        <feBlend in2="shape" result="effect1_innerShadow" />
      </filter>
      <filter id="c" width="59" height="59" x="30" y="31" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.45 0" />
        <feBlend in2="shape" result="effect1_innerShadow" />
      </filter>
      <filter id="d" width="50" height="50" x="36" y="37" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx="2" dy="2" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.941667 0 0 0 0 0.797749 0 0 0 0 0.427674 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation=".5" />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
        <feBlend in2="shape" result="effect2_innerShadow" />
      </filter>
      <filter id="e" width="14" height="32" x="54" y="46" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx="2" dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.811167 0 0 0 0 0.141667 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <linearGradient id="b" x1="13.417" x2="60.591" y1="9" y2="74" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD37E" />
        <stop offset="1" stopColor="#F0B90B" />
      </linearGradient>
    </defs>
  </svg>
)
