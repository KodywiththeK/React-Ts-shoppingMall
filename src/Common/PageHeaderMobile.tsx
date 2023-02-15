import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link, useNavigate } from 'react-router-dom';
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../Store';
import { shoppingSlice } from '../Store/productSlice';
import { AMAZON_ORANGE, BLACK1, DARK_NAVY, GRAY1, IVORY, WHITE } from '../constant/color';
import MiniCart from '../components/MiniCart';
import HeaderSearchMobile from '../components/Mobile/HeaderSearchMobile';

export default function PageHeaderMobile() {
  const navigate = useNavigate();
  const theme = useSelector((state:RootState) => state.mallState.theme)
  const cart = useSelector((state:RootState) => state.mallState.cart)  
  const dispatch = useAppDispatch();
  const changeTheme = () => { dispatch(shoppingSlice.actions.changeTheme()) }
  const [miniCart, setMiniCart] = useState(false)
  const handleMiniCart = (state:boolean) => {
    setMiniCart(state)
  }

  return (
    <>
    <Header theme={ theme ? IVORY : GRAY1 } >
      <Inner>
        <Link to={'/'}><Logo src='./images/amazonLogo.png' alt='logo' /></Link>
        <Theme onClick={changeTheme}>{theme ? <MdLightMode/>: <MdDarkMode style={{color: WHITE}}/>}</Theme>
        <ButtonContainer>
          <CartPart>
            <CartButton onClick={() => navigate('/cart')} theme={theme} style={{color: theme? BLACK1 : WHITE}}>
              <Cart>
                <FaShoppingCart/>
                <Num>{cart.length}</Num>
              </Cart>
            </CartButton>
            <MiniCart miniCartState={miniCart} setMiniCart={handleMiniCart} />
          </CartPart>
        </ButtonContainer>
        <HeaderSearchMobile />
      </Inner>
    </Header>
    </>
  )
}

const Header = styled.nav<{theme: string}>`
  position: fixed;
  top:0;
  display: flex;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #c0c0c0;
  justify-content: space-between;
  background-color: ${props => props.theme};
  z-index: 10;
`
const Inner = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  height: 100%;
  flex: 1 1 auto;
  margin: 0 auto;
  position: relative;
  align-items: center;
`
const Logo = styled.img`
  height: 100px;
  margin-top: 15px;
  width: 150px;
  margin-right: -10px;
`

const ButtonContainer = styled.div`
  width: 20vw;;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 5px;
`
const CartPart = styled.div`
  position: relative;
  width: 40px;
  height: 350px;
  display: flex;
  flex-direction: column;
`

const CartButton = styled.div<{theme: boolean}>`
  // position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0 5px;
  padding: 8px 0;
  cursor: pointer;
  // background-color: ${props => props.theme ? AMAZON_ORANGE : DARK_NAVY};
  flex-shrink: 0;
`

const Cart = styled.div`
  font-size : 25px;
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
  margin-left: 2px;
`

const Theme = styled.div`
  font-size : 30px;
  margin: 0 10px;
  margin-top: 7px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1)
  }
`