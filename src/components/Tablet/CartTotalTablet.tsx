import React from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../Store'
import { shoppingSlice } from '../../Store/productSlice';

export default function CartTotalTablet() {
  const dispatch = useAppDispatch();

  const theme = useSelector((state:RootState) => state.mallState.theme)
  const cartList = useSelector((state:RootState) => state.mallState.cart)
  const totalPrice = cartList.reduce((arr, cur) => {return arr + cur.price}, 0).toFixed(2)


  return (
    <Container theme={theme}>
      <Title><span>{cartList.length} items ready</span></Title>
      <Total>
        <Text>Total:</Text>
        <Price>{`$ ${totalPrice}`}</Price>
      </Total>
      {cartList.length < 1 ? 
      <Button disabled >Proceed to Checkout</Button> :
      <Button 
        onClick={() => {window.confirm(`Would you like to pay $${totalPrice}?`)&& dispatch(shoppingSlice.actions.clearCart())}}
        className={`btn btn--${theme ? 'brown' : 'reverse'}`}
        >
          Proceed to Checkout
      </Button> }
    </Container>
  )
}
const Container = styled.div<{theme:boolean}>`
  width: 93vw;
  height: 30vh;
  margin-top: 20px;
  margin-left: 20px;
  padding: 0 30px ;
  box-sizing: border-box;
  border-radius: 10px;
  color: ${props => props.theme ? 'black' : 'white'};
  background-color: ${props => props.theme ? '#ddebee' : '#232e3f'};
`
const Title = styled.h2`
  font-size: 35px;
  font-weight: 500;
  margin: 50px 0 30px 10px;
  // margin-bottom: 30px;
`
const Total = styled.div`
  display: flex;
  margin: 50px 0 30px 10px;
  font-size: 20px;
  font-weight: 500;
  align-items: center;
`
const Text = styled.div`
  margin-right: 10px;
`
const Price = styled.div`
  font-size: 30px;
`
const Button = styled.button`
  width: 100%;
  height: 45px;
  font-size: 18px;
`
