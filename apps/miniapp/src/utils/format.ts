import getTimePeriods from "./getTimePeriods"

// Copy from viem package to avoid unnecessary dependency
export function formatUnits(value: bigint, decimals: number) {
  let display = value.toString()

  const negative = display.startsWith('-')
  if (negative) display = display.slice(1)

  display = display.padStart(decimals, '0')

  let [integer, fraction] = [display.slice(0, display.length - decimals), display.slice(display.length - decimals)]
  fraction = fraction.replace(/(0+)$/, '')
  integer = integer || '0'

  return `${negative ? '-' : ''}${integer}${fraction ? `.${fraction}` : ''}`
}


export const formatBigIntToFixed = (number: bigint, displayDecimals = 18, decimals = 18) => {
  const formattedString = formatUnits(number, decimals)
  return (+formattedString).toFixed(displayDecimals)
}


export const padTime = (num: number) => num.toString().padStart(2, '0')

export const formatRoundTime = (secondsBetweenBlocks: number) => {
  const { hours, minutes, seconds } = getTimePeriods(secondsBetweenBlocks)
  const minutesSeconds = `${padTime(minutes)}:${padTime(seconds)}`

  if (hours > 0) {
    return `${padTime(hours)}:${minutesSeconds}`
  }

  return minutesSeconds
}

export function formatNumberWithoutZero(number: number | string, digits: number) {
  return Number(number).toLocaleString('en', {maximumFractionDigits:digits})
}
