import React, { FC, useState, useEffect } from 'react';
import Grid           from '@mui/material/Grid';
import useGetPriceData from 'hooks/useGetPriceData'
import useGetCurrentAPY from 'hooks/useGetCurrentAPY'
import { Skeleton } from '@saltswap/uikit'
import useTokenBalance from 'hooks/useTokenBalance'
import piggyContract from 'constants/piggyContract'

import {
  Container,
  Item,
  ItemExtra,
  ItemContent,
  VerticalItems,
  VerticalItem,
  VerticalItemContent,
  VerticalItemTitle,
  InputWrapper,
  InputTitle,
  Input,
  Range,
} from './style';
import Panel          from '../../components/Panel'

const Calculator: FC = () => {

  const { address, decimals } = piggyContract
  const piggyPrice = useGetPriceData()
  const piggyPriceFormatted = piggyPrice.toLocaleString('en-US', { maximumFractionDigits: 5 })

  const [rebaseRate, apyRate] = useGetCurrentAPY()
  const currentApyFormatted = apyRate ? apyRate.toLocaleString('en-US', { maximumFractionDigits: 2 }) : null

  const userBalance = useTokenBalance(address).toNumber() / 10 ** decimals
  const userBalanceFormatted = userBalance.toLocaleString()

  const [piggyAmount, setPiggyAmount] = useState(100)
  const [futurePIGGYMarketPrice, setFuturePIGGYMarketPrice] = useState(0)
  const [days, setDays] = useState(1)
  const [initInvestment, setInitInvestment] = useState(0)
  const [currentWealth, setCurrentWealth] = useState(0)
  const [piggyRewards, setPiggyRewards] = useState(0)
  const [potentialReturn, setPotentialReturn] = useState(0)

  useEffect(() => {
    const initInvestmentEst = piggyAmount * piggyPrice
    const currentWealthEst = piggyAmount * piggyPrice
    const piggyRewardsEst = piggyAmount * ((1 + rebaseRate) ** (days * 96) - 1)
    const potentialReturnEst = piggyRewardsEst * piggyPrice

    setFuturePIGGYMarketPrice(piggyPrice)
    setInitInvestment(initInvestmentEst)
    setCurrentWealth(currentWealthEst)
    setPiggyRewards(piggyRewardsEst)
    setPotentialReturn(potentialReturnEst)
  }, [piggyAmount, piggyPrice, apyRate, rebaseRate, days])

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <Panel>
            <Item>
                <ItemContent>
                  PIGGY Price
                </ItemContent>
                {piggyPriceFormatted ? (
                  <>
                    <ItemExtra>
                      {`$ ${piggyPriceFormatted}`}
                    </ItemExtra>
                  </>
                  ) : (
                  <>
                    <Skeleton height={32} />
                  </>
                )}
            </Item>
          </Panel>
        </Grid>  
        <Grid item md={4} xs={12}>
          <Panel>
            <Item>
                <ItemContent>
                Current APY
                </ItemContent>
                {currentApyFormatted ? (
                  <>
                    <ItemExtra>
                    {`${currentApyFormatted}%`}
                    </ItemExtra>
                  </>
                  ) : (
                  <>
                    <Skeleton height={32} />
                  </>
                )}
            </Item>
          </Panel>
        </Grid>
        <Grid item md={4} xs={12}>
          <Panel>
            <Item>
                <ItemContent>
                Your PIGGY Balance
                </ItemContent>
                <ItemExtra>
                  {`${userBalanceFormatted} PIGGY`}
                </ItemExtra>
            </Item>
          </Panel>
        </Grid>
        <Grid item md={12} xs={12}>
          <Panel borderColor="white">
            <VerticalItems>
                <div style={{display: 'flex', flexWrap:'wrap'}}>
                  <InputWrapper>
                    <InputTitle>PIGGY Amount</InputTitle>
                    <Input value={piggyAmount.toLocaleString('en-US', { maximumFractionDigits: 5 })} onChange={(e: any) => setPiggyAmount(e.target.value)} />
                  </InputWrapper>
                  <InputWrapper>
                    <InputTitle>APY(%)</InputTitle>
                    <Input value={apyRate.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 0} readOnly />
                  </InputWrapper>
                </div>
                <div style={{display: 'flex', flexWrap:'wrap'}}>
                  <InputWrapper>
                    <InputTitle>PIGGY price at purchase ($)</InputTitle>
                    <Input value={piggyPrice.toLocaleString('en-US', { maximumFractionDigits: 5 }) || 0} readOnly />
                  </InputWrapper>
                  <InputWrapper>
                    <InputTitle>Future PIGGY market price ($)</InputTitle>
                    <Input value={futurePIGGYMarketPrice.toLocaleString('en-US', { maximumFractionDigits: 5 }) || 0} readOnly />
                  </InputWrapper>
                </div>
                <VerticalItem style={{display: 'flex', paddingBottom: '0px'}}>
                    <VerticalItemTitle style={{float: 'unset'}}>Days</VerticalItemTitle>
                    <VerticalItemContent style={{float: 'unset', marginLeft: '10px', backgroundColor:'#3D1430', width: '60px', borderRadius: '15px', color: '#D15480', fontSize: '1rem', textAlign: 'center'}}>{days}</VerticalItemContent>
                </VerticalItem>
                <VerticalItem style={{padding: '0px'}}>
                    <VerticalItemContent style={{float: 'unset'}}>
                      <Range type="range" id="range" min="1" max="365" name="range" value={days} onChange={(e:any) => setDays(e.target.value)}/>
                    </VerticalItemContent>
                </VerticalItem>
                <VerticalItem>
                    <VerticalItemTitle>Your initial investment</VerticalItemTitle>
                    <VerticalItemContent>{ `$ ${initInvestment.toLocaleString('en-US', { maximumFractionDigits: 5 })}`} </VerticalItemContent>
                </VerticalItem>
                <VerticalItem>
                    <VerticalItemTitle>Current wealth</VerticalItemTitle>
                    <VerticalItemContent>{`$ ${currentWealth.toLocaleString('en-US', { maximumFractionDigits: 5 })}`}</VerticalItemContent>
                </VerticalItem>
                <VerticalItem>
                    <VerticalItemTitle>PIGGY rewards estimation</VerticalItemTitle>
                    <VerticalItemContent>{ `${piggyRewards.toLocaleString('en-US', { maximumFractionDigits: 5 })} PIGGY` }</VerticalItemContent>
                </VerticalItem>
                <VerticalItem>
                    <VerticalItemTitle>Potential return</VerticalItemTitle>
                    <VerticalItemContent>{`$ ${potentialReturn.toLocaleString('en-US', { maximumFractionDigits: 5 })}`}</VerticalItemContent>
                </VerticalItem>
            </VerticalItems>
          </Panel>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Calculator;
