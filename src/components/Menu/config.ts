import { MenuEntry } from '@saltswap/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Account',
    href: '/account',
    icon: 'GroupsIcon'
  },
  {
    label: 'Exchange',
    href: '/swap',
    icon: "ExchangeIcon"
  },
  {
    label: 'Liquidity',
    href: '/pool',
    icon: 'LiquidityIcon'
  },
  {
    label: 'Calculator',
    href: '/calculator',
    icon: "InfoIcon",
  },
  {
    label: "NFT",
    icon: "NftIcon",
    href: "/nft",
  },
]

export default config
