import React, { forwardRef } from 'react'

interface MaskProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean
}

export const Mask = forwardRef<HTMLDivElement, MaskProps>((props: MaskProps, ref) =>
  props.visible ? (
    <div ref={ref} className="fixed top-0 left-0 bottom-0 right-0 z-[1000] bg-[rgba(0,0,0,0.5)]" {...props} />
  ) : null,
)

Mask.displayName = 'Mask'
