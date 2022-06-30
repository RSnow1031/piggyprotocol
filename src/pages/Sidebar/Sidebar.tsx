import React, { FC, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useWindowSize } from 'use-window-size-hook';
import {
  Container,
  LogoImg,
  MenuImg,
  MenuText,
  MenuItemContainer,
} from './style';
import logoImg        from '../../assets/images/logo_sty.png'
import swapImg        from '../../assets/images/swap.svg'
import accountImg     from '../../assets/images/account.svg'
import dashboardImg   from '../../assets/images/dashboard.svg'
import calculatorImg  from '../../assets/images/calculator.svg'
import nftsImg  from '../../assets/images/nfts.svg'
import docsImg  from '../../assets/images/docs.svg'
import earnImg  from '../../assets/images/earn.svg'
import Button         from '../../components/Button'

const Sidebar: FC = () => {

  const history = useHistory();
  const location = useLocation();  
  const [show, setShow] = useState(true);
  const [active, setActive] = useState('/');
  const [currentWidth, setCurrentWidth] = useState<any>(0)
  const handleShowHide = () => {
    setShow(!show)
  }
  const {
    width,
    height,
    screenLayout,
  } = useWindowSize();

  useEffect(() => {
    setCurrentWidth(width)
    setActive(location.pathname)
    if(width && width > 970) setShow(true)
    else setShow(false)
  }, [location, width])
  // const getWindowDimensions = () => {
  //   const width = hasWindow ? window.innerWidth : null;
  //   const height = hasWindow ? window.innerHeight : null;
  //   return {
  //     width,
  //     height,
  //   };
  // }

  // const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const handleClickMenu = (route: string) => {
    history.push(route);
    if(width && width < 970) setShow(false)
    setActive(route)
  }
  return (
    <>
    <Button value="" onClick={handleShowHide}
      style={{
        position: 'fixed',
        zIndex: '10000000000000',
        width: '55px',
        display: currentWidth > 970 ? 'none' : 'unset'
      }}
    />
    <Container style={show ? {display: 'flex'} : {display: 'none'}}>
        <LogoImg src={logoImg} />
        <MenuItemContainer className={active === '/' ? 'active-menu' : ''} onClick={() => handleClickMenu('/')}>
            <MenuImg src={dashboardImg} />
            <MenuText >Dashboard</MenuText>
        </MenuItemContainer>
        <MenuItemContainer className={active === '/account' ? 'active-menu' : ''} onClick={() => handleClickMenu('/account')}>
            <MenuImg src={accountImg} />
            <MenuText >Account</MenuText>
        </MenuItemContainer>
        <MenuItemContainer className={active === '/calculator' ? 'active-menu' : ''} onClick={() => handleClickMenu('/calculator')}>
            <MenuImg src={calculatorImg} />
            <MenuText >Calculator</MenuText>
        </MenuItemContainer>
        <MenuItemContainer className={active === '/swap' ? 'active-menu' : ''} onClick={() => handleClickMenu('/swap')}>
            <MenuImg src={swapImg} />
            <MenuText >Swap</MenuText>
        </MenuItemContainer>
        <MenuItemContainer className={active === '/nfts' ? 'active-menu' : ''} onClick={() => handleClickMenu('/nfts')}>
            <MenuImg src={nftsImg} />
            <MenuText >NFTs</MenuText>
        </MenuItemContainer>
        <MenuItemContainer onClick={() =>{ window.location.href = 'https://docs.piggyprotocol.com'}}>
            <MenuImg src={docsImg} />
            <MenuText >DOCs</MenuText>
        </MenuItemContainer>
        <MenuItemContainer className={active === '/earn' ? 'active-menu' : ''} onClick={() => handleClickMenu('/earn')}>
            <MenuImg src={earnImg} />
            <MenuText >Earn</MenuText>
        </MenuItemContainer>
    </Container>
    </>
  );
};
export default Sidebar;
