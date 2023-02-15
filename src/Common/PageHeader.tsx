import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom';
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { BsCaretDownFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../Store';
import { shoppingSlice } from '../Store/productSlice';
import { AMAZON_ORANGE, BLACK1, BLACK3, DARK_NAVY, GRAY1, IVORY, WHITE } from '../constant/color';
import MiniCart from '../components/MiniCart';
import HeaderSearch from '../components/HeaderSearch';
import { Desktop, Tablet } from '../ReactResponsive/Responsive';
import HeaderSearchTablet from '../components/Tablet/HeaderSearchTablet';
import MiniCartTablet from '../components/Tablet/MiniCartTable';
import LogoImage from '../../images/amazonLogo.png'

export default function PageHeader() {

  const theme = useSelector((state:RootState) => state.mallState.theme)
  const cart = useSelector((state:RootState) => state.mallState.cart)  
  const dispatch = useAppDispatch();
  const changeTheme = () => { dispatch(shoppingSlice.actions.changeTheme()) }
  const toStore = () => { dispatch(shoppingSlice.actions.clearFilter()) }
  const [miniCart, setMiniCart] = useState(false)
  const handleMiniCart = (state:boolean) => {
    setMiniCart(state)
  }

  return (
    <Header theme={ theme ? IVORY : GRAY1 } >
      <Inner>
        <Link to={'/'}><Logo src={LogoImage} alt='logo' /></Link>
        <Link to={'/store'}><Store onClick={toStore} theme={theme ? BLACK3 : WHITE }>STORE</Store></Link>
        <Desktop>
        <HeaderSearch />
        </Desktop>
        <Tablet>
        <HeaderSearchTablet />
        </Tablet>
        <ButtonContainer>
          <CartPart>
            <CartButton onClick={() => setMiniCart(!miniCart)} miniCart={miniCart} theme={theme} style={{color: theme? BLACK1 : WHITE}}>
              <Cart>
                <FaShoppingCart/>
                <Num>{cart.length}</Num>
              </Cart>
              <CartShow><BsCaretDownFill style={{transform: miniCart ? 'rotate(180deg)' : ''}} /></CartShow>
            </CartButton>
            <Desktop>
            <MiniCart miniCartState={miniCart} setMiniCart={handleMiniCart} />
            </Desktop>
            <Tablet>
            <MiniCartTablet miniCartState={miniCart} setMiniCart={handleMiniCart} />
            </Tablet>
          </CartPart>
          <Theme onClick={changeTheme}>{theme ? <MdLightMode/>: <MdDarkMode style={{color: WHITE}}/>}</Theme>
        </ButtonContainer>
      </Inner>
    </Header>
  )
}

const Header = styled.nav<{theme: string}>`
  position: fixed;
  top:0;
  display: flex;
  width: 100%;
  height: 90px;
  border-bottom: 1px solid #c0c0c0;
  justify-content: space-around;
  background-color: ${props => props.theme};
  z-index: 10;
`
const Inner = styled.div`
  display: flex;
  max-width: 1200px;
  height: 100%;
  flex: 1 1 auto;
  margin: 0 auto;
  position: relative;
  align-items: center;
`
const Logo = styled.img`
  height: 120px;
  margin-top: 15px;
`
const Store = styled.div<{theme: string}>`
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  width: 10%;
  margin-right: 20px;
  color: ${props => props.theme};
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1)
  }
`

const Theme = styled.div`
  font-size : 35px;
  margin-left: auto;
  margin-top: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1)
  }
`
const ButtonContainer = styled.div`
  width: 20vw;;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`
const CartPart = styled.div`
  position: relative;
  width: 40px;
  height: 350px;
  display: flex;
  flex-direction: column;
`

const CartButton = styled.div<{theme:boolean, miniCart: boolean}>`
  // position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  padding: 10px 8px;
  border-radius: ${props => props.miniCart ? '8px 8px 0 0' : '8px' };
  margin-right: auto;
  cursor: pointer;
  background-color: ${props => props.theme ? AMAZON_ORANGE : DARK_NAVY};
  flex-shrink: 0;
`

const Cart = styled.div`
  font-size : 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 0;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1)
  }
`

const Num = styled.span`
  font-size: 20px;
  margin-left: 5px;
`

const CartShow = styled.div`
  margin-left: 10px;
`