import React, { FC, useState, useEffect } from 'react';

import Grid           from '@mui/material/Grid';
import { Skeleton } from '@saltswap/uikit'
import useReadPiggyContract from 'hooks/useReadPiggyContract'
import useGetPriceData from 'hooks/useGetPriceData'
import useTokenBalance from 'hooks/useTokenBalance'
import useGetCurrentAPY from 'hooks/useGetCurrentAPY'
import priceContracts from 'constants/piggyPriceContracts'
import formatSecondsToMMSS from 'utils/formatSecondsToMMSS'
import {
  Container,
  Item,
  ItemTitle,
  ItemContent,
  VerticalItems,
  VerticalItem,
  VerticalItemContent,
  VerticalItemTitle,
  
} from './style';
import Panel          from '../../components/Panel'

const Account: FC = () => {

  const { piggyAddress } = priceContracts
  const decimals = 5
  const userBalance = useTokenBalance(piggyAddress).toNumber() / 10 ** decimals

  const piggyPrice = useGetPriceData()

  const [rebaseRate, apyRate] = useGetCurrentAPY()
  const currentApyFormatted = apyRate ? apyRate.toLocaleString('en-US', { maximumFractionDigits: 2 }) : null

  const [totalSupply, circulatingSupply, liquidityBacking, nextRebase] = useReadPiggyContract()
  const nextRebaseFormatted = nextRebase? formatSecondsToMMSS(nextRebase) : null

  const [userValue, setUserValue] = useState(0)
  const [nextRewardAmount, setNextRewardAmount] = useState(0)
  const [nextRewardAmountUsd, setNextRewardAmountUsd] = useState(0)
  const [nextRewardYield, setNextRewardYield] = useState(0)
  const [roiOneDay, setRoiOneDay] = useState(0)
  const [roiOneDayUsd, setRoiOneDayUsd] = useState(0)
  const [roiFiveDay, setRoiFiveDay] = useState(0)
  const [roiFiveDayUsd, setRoiFiveDayUsd] = useState(0)
  
  useEffect(() => {
    const userValueEst = userBalance * piggyPrice
    const nextRewardAmountEst = userBalance * rebaseRate
    const nextRewardAmountUsdEst = userValueEst * rebaseRate
    const nextRewardYieldEst = rebaseRate * 100
    const roiOneDayEst = (1 + rebaseRate) ** 96 * 100 - 100
    const roiOneDayUsdEst = userValue * roiOneDayEst / 100
    const roiFiveDayEst = (1 + rebaseRate) ** 480 * 100 - 100
    const roiFiveDayUsdEst = userValue * roiFiveDayEst / 100
    
    setUserValue(userValueEst)
    setNextRewardAmount(nextRewardAmountEst)
    setNextRewardAmountUsd(nextRewardAmountUsdEst)
    setNextRewardYield(nextRewardYieldEst)
    setRoiOneDay(roiOneDayEst)
    setRoiOneDayUsd(roiOneDayUsdEst)
    setRoiFiveDay(roiFiveDayEst)
    setRoiFiveDayUsd(roiFiveDayUsdEst)
  }, [piggyPrice, userBalance, rebaseRate, userValue])

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={4} sm={12} xs={12}>
          <Panel>
            <Item>
              <ItemContent>
                Your Balance
              </ItemContent>
              <ItemContent>
                {`$${userValue.toLocaleString('en-US', { maximumFractionDigits: 5 })}`}
              </ItemContent>
              <ItemTitle>
                {`${userBalance.toLocaleString('en-US', { maximumFractionDigits: 5 })} PIGGY`}
              </ItemTitle>
            </Item>
          </Panel>
        </Grid>  
        <Grid item md={4} sm={12} xs={12}>
          <Panel>
            <Item>
                <ItemContent>
                APY
                </ItemContent>
                {currentApyFormatted ? (
                  <>
                    <ItemContent>
                      {`${currentApyFormatted}%`}
                    </ItemContent>
                  </>
                  ) : (
                  <>
                    <Skeleton height={32} />
                  </>
                )}
                <ItemTitle>
                { `DAILY ROI ${  roiOneDay.toLocaleString('en-US', { maximumFractionDigits: 2 })  }%` }
                </ItemTitle>
            </Item>
          </Panel>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <Panel>
            <Item>
                <ItemContent>
                Next Rebase
                </ItemContent>
                {nextRebaseFormatted ? (
                  <>
                    <ItemContent>
                      {nextRebaseFormatted}
                    </ItemContent>
                  </>
                  ) : (
                  <>
                    <Skeleton height={32} />
                  </>
                )}
                <ItemTitle>
                You will earn money soon
                </ItemTitle>
            </Item>
          </Panel>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Panel borderColor="white">
            <VerticalItems>
                
                <VerticalItem>
                    <VerticalItemTitle>Current PIGGY Price</VerticalItemTitle>
                    <VerticalItemContent>{`$${ piggyPrice.toLocaleString('en-US', { maximumFractionDigits: 5 }) }`}</VerticalItemContent>
                </VerticalItem>
                <VerticalItem>
                    <VerticalItemTitle>Next Reward Amount</VerticalItemTitle>
                    <VerticalItemContent>{`${nextRewardAmount.toLocaleString('en-US', { maximumFractionDigits: 5 }) } PIGGY`}</VerticalItemContent>
                </VerticalItem>
                <VerticalItem>
                    <VerticalItemTitle>Next Reward Amount USD</VerticalItemTitle>
                    <VerticalItemContent>{`$${nextRewardAmountUsd.toLocaleString('en-US', { maximumFractionDigits: 5 }) }`}</VerticalItemContent>
                </VerticalItem>
                <VerticalItem>
                    <VerticalItemTitle>Next Reward Yield</VerticalItemTitle>
                    <VerticalItemContent>{`${nextRewardYield.toLocaleString('en-US', { maximumFractionDigits: 5 }) } %`}</VerticalItemContent>
                </VerticalItem>
                <VerticalItem>
                    <VerticalItemTitle>ROI(1-Day Rate) USD</VerticalItemTitle>
                    <VerticalItemContent>{`$${roiOneDayUsd.toLocaleString('en-US', { maximumFractionDigits: 5 })}`}</VerticalItemContent>
                </VerticalItem>
                <VerticalItem>
                    <VerticalItemTitle>ROI(5-Day Rate)</VerticalItemTitle>
                    <VerticalItemContent>{`${roiFiveDay.toLocaleString('en-US', { maximumFractionDigits: 5 })} %`}</VerticalItemContent>
                </VerticalItem>
                <VerticalItem>
                    <VerticalItemTitle>ROI(5-Day Rate) USD</VerticalItemTitle>
                    <VerticalItemContent>{`$${roiFiveDayUsd.toLocaleString('en-US', { maximumFractionDigits: 5 })}`}</VerticalItemContent>
                </VerticalItem>
            </VerticalItems>
          </Panel>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Account;
