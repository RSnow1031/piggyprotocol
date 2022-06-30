import { useEffect, useState } from 'react'
import { getContract } from 'utils/web3'
import routerV2ABI from 'config/abi/routerV2.json'
import piggyTokenABI from 'config/abi/piggyToken.json'
import priceContracts from '../constants/piggyPriceContracts'

const routerV2Address = "0x10ed43c718714eb63d5aa57b78b54704e256024e"

const useGetPriceData = () => {
  const [piggyPrice, setPiggyPrice] = useState<number>(0)

  const routerContract = getContract(routerV2ABI, routerV2Address)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (routerContract) {
          const { piggyAddress, busdAddress, wbnbAddress } = priceContracts;

          const tokenContract = getContract(piggyTokenABI, piggyAddress);
          const decimals = await tokenContract.methods.decimals().call();
          const amount = 1 * 10 ** decimals;

          const [cakeAmount, wbnbAmount, busdAmount] = await routerContract.methods.getAmountsOut(
            amount,
            [piggyAddress, wbnbAddress, busdAddress]
          ).call();

          const busdAmountDecimal = busdAmount / 10 ** 18

          setPiggyPrice(busdAmountDecimal)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [routerContract])

  return piggyPrice
}

export default useGetPriceData
