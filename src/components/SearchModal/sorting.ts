import { Token, TokenAmount } from '@pancakeswap-libs/sdk'
import { useMemo } from 'react'
import piggyContract from 'constants/piggyContract'
import { useAllTokenBalances } from '../../state/wallet/hooks'

const piggyAddress = piggyContract.address

// find the piggy token coming first
function addressComparator(addressA: string, addressB: string) {
  return addressA.toLowerCase() === piggyAddress.toLowerCase()? -1 : addressB.toLowerCase() === piggyAddress.toLowerCase() ? 1 : 0
}

// compare two token amounts with highest one coming first
function balanceComparator(balanceA?: TokenAmount, balanceB?: TokenAmount) {
  if (balanceA && balanceB) {
    return balanceA.greaterThan(balanceB) ? -1 : balanceA.equalTo(balanceB) ? 0 : 1
  }
  if (balanceA && balanceA.greaterThan('0')) {
    return -1
  }
  if (balanceB && balanceB.greaterThan('0')) {
    return 1
  }
  return 0
}

function getTokenComparator(balances: {
  [tokenAddress: string]: TokenAmount | undefined
}, inverted: boolean): (tokenA: Token, tokenB: Token) => number {
  return function sortTokens(tokenA: Token, tokenB: Token): number {
    // -1 = a is first
    // 1 = b is first

    const addressComp = addressComparator(tokenA.address, tokenB.address)
    if (addressComp !== 0) return inverted? addressComp * -1 : addressComp

    // sort by balances
    const balanceA = balances[tokenA.address]
    const balanceB = balances[tokenB.address]

    const balanceComp = balanceComparator(balanceA, balanceB)
    if (balanceComp !== 0) return balanceComp

    if (tokenA.symbol && tokenB.symbol) {
      // sort by symbol
      return tokenA.symbol.toLowerCase() < tokenB.symbol.toLowerCase() ? -1 : 1
    }
    return tokenA.symbol ? -1 : tokenB.symbol ? -1 : 0
  }
}

export function useTokenComparator(inverted: boolean): (tokenA: Token, tokenB: Token) => number {
  const balances = useAllTokenBalances()
  const comparator = useMemo(() => getTokenComparator(balances ?? {}, inverted), [balances, inverted])
  return useMemo(() => {
    if (inverted) {
      return (tokenA: Token, tokenB: Token) => comparator(tokenA, tokenB) * -1
    }
    return comparator
  }, [inverted, comparator])
}

export default useTokenComparator
