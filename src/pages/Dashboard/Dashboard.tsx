import React, { FC, useState, useEffect } from 'react';
import useGetPriceData from 'hooks/useGetPriceData'
import useReadPiggyContract from 'hooks/useReadPiggyContract'
import useGetTreasuryBalance from 'hooks/useGetTreasuryBalance'
import useGetPoolBalance from 'hooks/useGetPoolBalance'
import useGetInsuranceFundBalance from 'hooks/useGetInsuranceFundBalance'
import useGetBonfireBalance from 'hooks/useGetBonfireBalance'
import { Skeleton } from '@saltswap/uikit'
import formatSecondsToMMSS from 'utils/formatSecondsToMMSS'

import Grid           from '@mui/material/Grid';
import {
  Container,
  Item,
  ItemTitle,
  ItemContent,
} from './style';
import Panel          from '../../components/Panel'

const Dashboard: FC = () => {

  const piggyPrice = useGetPriceData()
  const piggyPriceFormatted = piggyPrice.toLocaleString('en-US', { maximumFractionDigits: 5 })

  const [totalSupply, circulatingSupply, liquidityBacking, nextRebase] = useReadPiggyContract()
  const totalSupplyFormatted = totalSupply ? totalSupply.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null
  const circulatingSupplyFormatted = circulatingSupply ? circulatingSupply.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null
  const liquidityBackingFormatted = liquidityBacking.toLocaleString('en-US', { maximumFractionDigits: 2 })
  const nextRebaseFormatted = nextRebase?  formatSecondsToMMSS(nextRebase) : null

  const treasuryBalance = useGetTreasuryBalance()
  const treasuryValue = treasuryBalance * piggyPrice
  const treasuryValueFormatted = treasuryValue.toLocaleString('en-US', { maximumFractionDigits: 5 })

  const insuranceFundBalance = useGetInsuranceFundBalance()
  const insuranceFundValue = insuranceFundBalance * piggyPrice
  const insuranceFundValueFormatted = insuranceFundValue.toLocaleString('en-US', { maximumFractionDigits: 5 })

  const poolBalance = useGetPoolBalance()
  const poolValue = poolBalance * piggyPrice
  const poolValueFormatted = poolValue.toLocaleString('en-US', { maximumFractionDigits: 5 })

  const bonfireBalance = useGetBonfireBalance()
  const bonfireValue = bonfireBalance * piggyPrice
  const bonfireBalanceFormatted = bonfireBalance.toLocaleString('en-US', { maximumFractionDigits: 5 })
  const bonfireValueFormatted = bonfireValue.toLocaleString('en-US', { maximumFractionDigits: 5 })

  const [marketCap, setMarketCap] = useState(0);
  const [bonfireSupply, setBonfireSupply] = useState<string | null>(null);

  useEffect(() => {
    const marketCapEst = totalSupply * piggyPrice
    setMarketCap(marketCapEst)

    const bonfireSupplyEst = bonfireBalance / totalSupply * 100
    const bonfireSupplyFormatted = bonfireSupplyEst.toLocaleString('en-US', { maximumFractionDigits: 5 })
    setBonfireSupply(bonfireSupplyFormatted)

  }, [piggyPrice, totalSupply, bonfireBalance, bonfireBalanceFormatted])


  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Panel>
            <Grid container spacing={2}>
              <Grid item md={4} sm={6} xs={12}>
                <Item>
                  <ItemTitle>
                  PIGGY Price
                  </ItemTitle>
                  {piggyPriceFormatted ? (
                    <>
                      <ItemContent>
                        {`$ ${piggyPriceFormatted}`}
                      </ItemContent>
                    </>
                    ) : (
                    <>
                      <Skeleton height={32} />
                    </>
                  )}
                </Item>
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <Item>
                  <ItemTitle>
                  Marketcap
                  </ItemTitle>
                  <ItemContent>
                    {`$ ${marketCap.toLocaleString('en-US', { maximumFractionDigits: 5 })}`}
                  </ItemContent>
                </Item>
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <Item>
                  <ItemTitle>
                  Circulating Supply
                  </ItemTitle>
                  {circulatingSupplyFormatted ? (
                    <>
                      <ItemContent>
                        {circulatingSupplyFormatted}
                      </ItemContent>
                    </>
                    ) : (
                    <>
                      <Skeleton height={32} />
                    </>
                  )}
                </Item>
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <Item>
                  <ItemTitle>
                  Backed Liquidity
                  </ItemTitle>
                  {liquidityBackingFormatted ? (
                    <>
                      <ItemContent>
                        {`${liquidityBackingFormatted}%`}
                      </ItemContent>
                    </>
                    ) : (
                    <>
                      <Skeleton height={32} />
                    </>
                  )}
                </Item>
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <Item>
                  <ItemTitle>
                  Next Rebase
                  </ItemTitle>
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
                </Item>
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <Item>
                  <ItemTitle>
                  Total Supply
                  </ItemTitle>
                  {totalSupplyFormatted ? (
                    <>
                      <ItemContent>
                        {totalSupplyFormatted}
                      </ItemContent>
                    </>
                    ) : (
                    <>
                      <Skeleton height={32} />
                    </>
                  )}
                </Item>
              </Grid>
            </Grid>
          </Panel>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Panel>
            <Item>
              <ItemTitle>
              PIGGY Price
              </ItemTitle>
              {piggyPriceFormatted ? (
                    <>
                      <ItemContent>
                        {`$${piggyPriceFormatted}`}
                      </ItemContent>
                    </>
                    ) : (
                    <>
                      <Skeleton height={32} />
                    </>
                  )}
            </Item>
          </Panel>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Panel>
            <Item>
              <ItemTitle>
              Market Value of Treasury Asset
              </ItemTitle>
              {treasuryValueFormatted ? (
                <>
                  <ItemContent>
                    {`$${treasuryValueFormatted}`}
                  </ItemContent>
                </>
                ) : (
                <>
                  <Skeleton height={32} />
                </>
              )}
            </Item>
          </Panel>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Panel>
            <Item>
              <ItemTitle>
              Pool Value
              </ItemTitle>
              {poolValueFormatted ? (
                <>
                  <ItemContent>
                    {`$${poolValueFormatted}`}
                  </ItemContent>
                </>
                ) : (
                <>
                  <Skeleton height={32} />
                </>
              )}
            </Item>
          </Panel>
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Panel>
            <Item>
              <ItemTitle>
              PIGGY Insurance Fund Value
              </ItemTitle>
              <ItemContent>
              {insuranceFundValueFormatted ? (
                <>
                  <ItemContent>
                    {`$${insuranceFundValueFormatted}`}
                  </ItemContent>
                </>
                ) : (
                <>
                  <Skeleton height={32} />
                </>
              )}
              </ItemContent>
            </Item>
          </Panel>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Panel>
            <Item>
              <ItemTitle>
              # Black Hole
              </ItemTitle>
              {bonfireBalanceFormatted ? (
                <>
                  <ItemContent>
                    {`${bonfireBalanceFormatted} PIGGY`}
                  </ItemContent>
                </>
                ) : (
                <>
                  <Skeleton height={32} />
                </>
              )}
            </Item>
          </Panel>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Panel>
            <Item>
              <ItemTitle>
              $ Value of Black Hole
              </ItemTitle>
              {bonfireValueFormatted ? (
                <>
                  <ItemContent>
                    {`$${bonfireValueFormatted}`}
                  </ItemContent>
                </>
                ) : (
                <>
                  <Skeleton height={32} />
                </>
              )}
            </Item>
          </Panel>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Panel>
            <Item>
              <ItemTitle>
              % Black Hole : Supply
              </ItemTitle>
              {bonfireSupply ? (
                <>
                  <ItemContent>
                    {`${bonfireSupply} %`}
                  </ItemContent>
                </>
                ) : (
                <>
                  <Skeleton height={32} />
                </>
              )}
            </Item>
          </Panel>
        </Grid>
      </Grid>
      
    </Container>
  );
};
export default Dashboard;
