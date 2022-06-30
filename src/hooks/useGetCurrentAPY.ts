import { useEffect, useState } from 'react'
import { getContract } from 'utils/web3'
import piggyTokenABI from 'config/abi/piggyToken.json'
import piggyContract from '../constants/piggyContract'
import piggyRebaseRates from '../constants/piggyRebaseRates'

const { address } = piggyContract
const { rebaseRate1, rebaseRate2, rebaseRate3, rebaseRate4 } = piggyRebaseRates

const useGetCurrentAPY = () => {
  const [apyRate, setApyRate] = useState<number>(0)
  const [rebaseRate, setRebaseRate] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const tokenContract = getContract(piggyTokenABI, address)
      try {
        if (tokenContract) {

          const currentTime = Math. round((new Date()). getTime() / 1000)
          const initRebaseStartTime = await tokenContract.methods.initRebaseStartTime().call()
          const lastRebasedTime = await tokenContract.methods.lastRebasedTime().call()

          const deltaTimeFromInit = currentTime - initRebaseStartTime;
          const deltaTime = currentTime - lastRebasedTime;
          const times = deltaTime / (15 * 60);
          const epoch = times * 15;

          if (deltaTimeFromInit < 365 * 24 * 3600) {
            setRebaseRate(rebaseRate1);
          } else if (
              (deltaTimeFromInit >= 365 * 24 * 3600) &&
              (deltaTimeFromInit < (15 * 365 * 24 * 3600) / 10)
          ) {
            setRebaseRate(rebaseRate2);
          } else if (
              (deltaTimeFromInit >= (15 * 365 * 24 * 3600) / 10) &&
              (deltaTimeFromInit < (7 * 365 * 24 * 3600))
          ) {
            setRebaseRate(rebaseRate3);
          } else if (deltaTimeFromInit >= (7 * 365 * 24 * 3600)) {
            setRebaseRate(rebaseRate4);
          }

          const currentAPY = (1 + rebaseRate) ** 35040 * 100

          setApyRate(currentAPY)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [rebaseRate])

  return [rebaseRate, apyRate]
}

export default useGetCurrentAPY
