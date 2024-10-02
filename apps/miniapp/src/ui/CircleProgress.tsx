'use client'

import React, { useCallback, useEffect, useMemo } from 'react'

export interface CircleProgressProps extends React.HTMLAttributes<HTMLCanvasElement> {
  percent?: number
  size?: number
  reverse?: boolean
  round?: boolean
  width?: number
  color?: string
  bgColor?: string
}

const CircleProgress = React.memo(
  ({
    percent = 0,
    size = 100,
    reverse = false,
    round = false,
    width = 20,
    color = '#000',
    bgColor = '#000',
    id = 'canvas-circle-progress',
    style = {},
    ...rest
  }: CircleProgressProps) => {
    const halfSize = useMemo(() => size / 2, [size])

    const draw = useCallback(() => {
      const canvas = document.getElementById(id) as HTMLCanvasElement

      if (!canvas || !canvas.getContext) return

      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return null
      }

      if (window.devicePixelRatio) {
        canvas.width = size * window.devicePixelRatio
        canvas.height = size * window.devicePixelRatio
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }

      ctx.lineWidth = width

      // draw background
      ctx.strokeStyle = bgColor
      ctx.lineCap = round ? 'round' : 'butt'
      ctx.beginPath()
      ctx.arc(halfSize, halfSize, halfSize - width / 2, 0, 2 * Math.PI)
      ctx.stroke()

      // draw foreground
      const step = (percent / 100) * 2
      ctx.strokeStyle = color
      ctx.lineCap = round ? 'round' : 'butt'
      ctx.beginPath()
      ctx.arc(
        halfSize,
        halfSize,
        halfSize - width / 2,
        -Math.PI / 2,
        reverse ? -Math.PI / 2 - step * Math.PI : step * Math.PI - Math.PI / 2,
        reverse,
      )
      ctx.stroke()

      return id
    }, [percent, size, reverse, round, width, color, bgColor, id, halfSize])

    useEffect(() => {
      draw()
    }, [draw])

    return <canvas id={id} style={{ width: size, height: size, ...style }} {...rest} />
  },
)

CircleProgress.displayName = 'CircleProgress'

export { CircleProgress }
