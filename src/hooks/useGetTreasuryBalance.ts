import { useEffect, useState } from 'react'
import { getContract } from 'utils/web3'
import piggyTokenABI from 'config/abi/piggyToken.json'
import priceContracts from '../constants/piggyPriceContracts'

const { piggyAddress } = priceContracts

const useGetTreasuryBalance = () => {
  const [treasuryBalance, setTreasuryBalance] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const tokenContract = getContract(piggyTokenABI, piggyAddress);
      try {
        if (tokenContract) {

          const treasuryReceiver = await tokenContract.methods.treasuryReceiver().call();
          const treasuryBalanceRes = await tokenContract.methods.balanceOf(treasuryReceiver).call();
          const decimals = await tokenContract.methods.decimals().call();

          setTreasuryBalance(treasuryBalanceRes / 10 ** decimals)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [])


  return treasuryBalance
}

export default useGetTreasuryBalance
