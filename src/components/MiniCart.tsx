import React from 'react'
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from '../Store';
import { BsFillTrashFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { shoppingSlice } from '../Store/productSlice';
import { AMAZON_ORANGE, DARK_NAVY, GRAY1, IVORY, NAVY } from '../constant/color';

interface MiniCartPropsType {
  miniCartState: boolean
  setMiniCart: (state:boolean)=> void;
}

export default function MiniCart(props:MiniCartPropsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useSelector((state:RootState) => state.mallState.theme)
  const cart = useSelector((state:RootState) => state.mallState.cart)
  const cartResult = cart.reduce((acc: { [x: string]: any; hasOwnProperty: (arg0: any) => any }, cur: { id: number }) => {
    if(acc.hasOwnProperty(cur.id)) {
      return {
        ...acc,
        [String(cur.id)] : [...acc[String(cur.id)], cur]
      }
    } else {
      return {
        ...acc,
        [String(cur.id)] : [cur]
      }
    }
  }, {}) 
  const cartResultKey = Object.keys(cartResult)

  return (
    <>
    {props.miniCartState && <CartSection theme={theme}>
    <CartItemBox theme={theme}>
      {cartResultKey.map((item) => (
        <CartItem key={item}>
          <ItemImg onClick={()=>navigate(`/store/${cartResult[item][0].id}`)} src={cartResult[item][0].image} alt={cartResult[item][0].title}/>
          <ItemInfo theme={theme}>
            <ItemTitle onClick={()=>navigate(`/store/${cartResult[item][0].id}`)}>{cartResult[item][0].title}</ItemTitle>
            <ItemPrice>{`$ ${cartResult[item][0].price}   x ${cartResult[item].length}`}</ItemPrice>
          </ItemInfo>
          <ItemRemove onClick={()=>{dispatch(shoppingSlice.actions.deleteCartItem(cart.indexOf(cartResult[item][0])))}} theme={theme}><BsFillTrashFill /></ItemRemove>
        </CartItem>
      ))} 
      </CartItemBox>
      <GoToCart theme={theme} onClick={() => {
        props.setMiniCart(!props.miniCartState)
        return navigate('/cart')
        }}>Go To Cart</GoToCart>
    </CartSection>}
    </>
  )
}

const CartSection = styled.div<{theme: boolean}>`
  position: relative;
  width: 25vw;
  background-color: ${props => props.theme ? AMAZON_ORANGE : DARK_NAVY};
  padding: 5px;
  margin-left: -70px;
  border-radius: 0 8px 8px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CartItemBox = styled.div<{theme: boolean}>`
  max-height: 300px;
  width: 100%;
  background-color: ${props=> props.theme ? IVORY : GRAY1};
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  overflow-y: scroll;
  overflow-x: hidden;
`
const CartItem = styled.div`
  display: flex;
  // justify-content: space-between;
  width: 100%;
  height: 90px;
  margin-bottom: 10px;
  padding: 5px;
  box-sizing: border-box;
`
const ItemImg = styled.img`
  margin-left: 5px;
  margin-right: 20px;
  width: 20%;
  height: 100%;
  border-radius: 100%;
  box-shadow: 1px 1px 3px 1px #c0c0c0;
  cursor: pointer;
`
const ItemInfo = styled.div<{theme: boolean}>`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${props => props.theme ? 'black' : IVORY};
`
const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
const ItemPrice = styled.div`
  white-space: pre-wrap;
  font-size: 18px;
`
const ItemRemove = styled.div<{theme: boolean}>`
  display: flex;
  width: 12%;
  justify-content: flex-end;
  align-items: center;
  font-size: 23px;
  color: ${props => props.theme ? 'black' : IVORY};
  text-shadow: 1px 1px 3px 1px #c0c0c0;
  cursor: pointer;
`
const GoToCart = styled.button<{theme: boolean}>`
  // position:fixed;
  width: 100%;
  height: 50px;
  margin-top: 5px;
  background-color: ${props=> props.theme ? AMAZON_ORANGE : NAVY};
  color: ${props => props.theme ? 'black' : 'white'};
  border: none;
  border-radius: 10px;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  transition: font-size 0.2s ease;
  &:hover {
    font-size: 25px;
  }
` 