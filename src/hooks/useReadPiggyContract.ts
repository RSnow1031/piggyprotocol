import { useEffect, useState } from 'react'
import { getContract } from 'utils/web3'
import piggyTokenABI from 'config/abi/piggyToken.json'
import priceContracts from '../constants/piggyPriceContracts'

const { piggyAddress } = priceContracts

const useReadPiggyContract = () => {
  const [totalSupply, setTotalSupply] = useState<number>(0)
  const [circulatingSupply, setCirculatingSupply] = useState<number>(0)
  const [liquidityBacking, setLiquidityBacking] = useState<number>(0)
  const [nextRebase, setNextRebase] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const tokenContract = getContract(piggyTokenABI, piggyAddress);
      try {
        if (tokenContract) {

          const decimals = await tokenContract.methods.decimals().call();
          const totalSupplyRes = await tokenContract.methods.totalSupply().call();
          const circulatingSupplyRes = await tokenContract.methods.getCirculatingSupply().call();
          const accuracy = 100000
          const liquidityBackingRes = await tokenContract.methods.getLiquidityBacking(accuracy).call();
          const liquidityBackingNum = parseInt(liquidityBackingRes)
          const lastRebaseTimeRes = await tokenContract.methods.lastRebasedTime().call();
          const lastRebaseTimeNum = parseInt(lastRebaseTimeRes)
          
          const currentTime = Math.round((new Date()). getTime() / 1000)
          const nextRebaseEst = Math.ceil((currentTime - lastRebaseTimeNum) / 900) * 900 + lastRebaseTimeNum - currentTime
          
          setTotalSupply(totalSupplyRes / 10 ** decimals)
          setCirculatingSupply(circulatingSupplyRes / 10 ** decimals)
          setLiquidityBacking(liquidityBackingNum / 100)
          setNextRebase(nextRebaseEst)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [totalSupply, circulatingSupply, nextRebase])


  return [totalSupply, circulatingSupply, liquidityBacking, nextRebase]
}

export default useReadPiggyContract
