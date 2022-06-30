import { useEffect, useState } from 'react'
import { getContract } from 'utils/web3'
import piggyTokenABI from 'config/abi/piggyToken.json'
import priceContracts from '../constants/piggyPriceContracts'

const { piggyAddress } = priceContracts

const useGetInsuranceFundBalance = () => {
  const [insuranceFundBalance, setInsuranceFundBalance] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const tokenContract = getContract(piggyTokenABI, piggyAddress);
      try {
        if (tokenContract) {

          const piggyProtocolInsuranceFundReceiver = await tokenContract.methods.piggyProtocolInsuranceFundReceiver().call();
          const insuranceFundBalanceRes = await tokenContract.methods.balanceOf(piggyProtocolInsuranceFundReceiver).call();
          const decimals = await tokenContract.methods.decimals().call();

          setInsuranceFundBalance(insuranceFundBalanceRes / 10 ** decimals)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [])


  return insuranceFundBalance
}

export default useGetInsuranceFundBalance
