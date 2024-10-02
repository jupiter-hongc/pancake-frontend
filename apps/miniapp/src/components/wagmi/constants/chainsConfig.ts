import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseGoerli,
  bsc,
  bscTestnet,
  mainnet,
  opBNB,
  opBNBTestnet,
  sepolia,
} from 'wagmi/chains'

export type ChainConfig = {
  name: string
  iconUrlPath: string
  color: string
  apiNetwork: string
  shortenName: string
}
export const networkNameMap = new Map<number, ChainConfig>([
  [
    mainnet.id,
    {
      name: mainnet.name,
      iconUrlPath: '/static/images/wallet/eth-logo.svg',
      color: '#28A0F0',
      apiNetwork: 'bnb',
      shortenName: 'ETH',
    },
  ],
  [
    sepolia.id,
    {
      name: sepolia.name,
      iconUrlPath: '/static/images/wallet/eth-logo.svg',
      color: '#28A0F0',
      apiNetwork: 'bnb',
      shortenName: sepolia.name,
    },
  ],
  [
    bsc.id,
    {
      name: 'BNB Chain',
      iconUrlPath: '/static/images/wallet/bsc-logo.svg',
      color: '#F0B90B',
      apiNetwork: 'bnb',
      shortenName: 'BSC',
    },
  ],
  [
    bscTestnet.id,
    {
      name: 'BNB Testnet',
      iconUrlPath: '/static/images/wallet/bsc-logo.svg',
      color: '#F0B90B',
      apiNetwork: 'bnb-testnet',
      shortenName: 'BSC testnet',
    },
  ],
  [
    arbitrum.id,
    {
      name: 'Arbitrum',
      iconUrlPath: '/static/images/wallet/arb-logo.svg',
      color: '#28A0F0',
      apiNetwork: 'arbitrum',
      shortenName: 'Arbitrum',
    },
  ],
  [
    arbitrumSepolia.id,
    {
      name: 'Arbitrum Sepolia',
      iconUrlPath: '/static/images/wallet/arb-logo.svg',
      color: '#28A0F0',
      apiNetwork: 'arbitrum-sepolia',
      shortenName: 'Arbitrum Sepolia',
    },
  ],
  [
    opBNB.id,
    {
      name: 'opBNB',
      iconUrlPath: '/static/images/wallet/opbnb-logo.svg',
      color: '#F0B90B',
      apiNetwork: 'opBNB',
      shortenName: 'opBNB',
    },
  ],
  [
    opBNBTestnet.id,
    {
      name: 'opBNB Testnet',
      iconUrlPath: '/static/images/wallet/opbnb-logo.svg',
      color: '#F0B90B',
      apiNetwork: 'opBNBTestnet',
      shortenName: 'opBNB Testnet',
    },
  ],
  [
    base.id,
    {
      name: 'Base',
      iconUrlPath: '/static/images/wallet/base-logo.svg',
      color: '#3a7aff',
      apiNetwork: 'base',
      shortenName: 'Base',
    },
  ],
  [
    baseGoerli.id,
    {
      name: 'Base Goerli',
      iconUrlPath: '/static/images/wallet/base-logo.svg',
      color: '#3a7aff',
      apiNetwork: 'base-goerli',
      shortenName: 'Base Goerli',
    },
  ],
])
// The network name from wagmi are too long for our design. Need to shorten it
export const getNetworkCustomConfigById = (id: number | void) => {
  if (!id) return undefined
  return networkNameMap.get(id)
}

export const getNetworkNameById = (id: number | undefined, defaultName?: string) =>
  getNetworkCustomConfigById(id)?.name ?? defaultName ?? ''

export const getNetworkShortenNameById = (id: number | undefined, defaultName?: string) =>
  getNetworkCustomConfigById(id)?.shortenName ?? defaultName ?? ''

export const getChainById = (chainId: number) => networkNameMap.get(chainId)
