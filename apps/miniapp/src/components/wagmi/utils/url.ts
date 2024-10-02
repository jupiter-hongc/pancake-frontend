export const getUrlWithoutChain = () => {
  const pathname = window.location.href.split('?')[0]
  const search = window.location.href.split('?')[1]
  const searchParams = new URLSearchParams(search)

  searchParams.delete('chain')
  return `${pathname}${[...new Set(searchParams.keys())].length > 0 ? `?${searchParams.toString()}` : ''}`
}
