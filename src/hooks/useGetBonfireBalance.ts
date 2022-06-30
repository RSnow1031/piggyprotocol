import { useEffect, useState } from 'react'
import { getContract } from 'utils/web3'
import piggyTokenABI from 'config/abi/piggyToken.json'
import priceContracts from '../constants/piggyPriceContracts'

const { piggyAddress } = priceContracts

const useGetBonfireBalance = () => {
  const [bonFireBalance, setBonFireBalance] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const tokenContract = getContract(piggyTokenABI, piggyAddress);
      try {
        if (tokenContract) {

          const bonFire = await tokenContract.methods.bonFire().call();
          const bonFireBalanceRes = await tokenContract.methods.balanceOf(bonFire).call();
          
          const decimals = await tokenContract.methods.decimals().call();

          setBonFireBalance(bonFireBalanceRes / 10 ** decimals)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [])


  return bonFireBalance
}

export default useGetBonfireBalance
