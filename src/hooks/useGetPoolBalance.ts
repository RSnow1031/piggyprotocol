import { useEffect, useState } from 'react'
import { getContract } from 'utils/web3'
import piggyTokenABI from 'config/abi/piggyToken.json'
import priceContracts from '../constants/piggyPriceContracts'

const { piggyAddress } = priceContracts

const useGetPoolBalance = () => {
  const [poolBalance, setPoolBalance] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const tokenContract = getContract(piggyTokenABI, piggyAddress);
      try {
        if (tokenContract) {

          const pair = await tokenContract.methods.pair().call();
          const poolBalanceRes = await tokenContract.methods.balanceOf(pair).call();
          
          const decimals = await tokenContract.methods.decimals().call();

          setPoolBalance(poolBalanceRes / 10 ** decimals)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [])


  return poolBalance
}

export default useGetPoolBalance
