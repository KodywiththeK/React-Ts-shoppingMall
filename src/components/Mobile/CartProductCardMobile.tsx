import React from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { shoppingSlice } from '../../Store/productSlice'
import { RootState, useAppDispatch } from '../../Store'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { productType } from '../../Service/getData'
import { AMAZON_ORANGE, GRAY2, NAVY, WHITE } from '../../constant/color'
import { Link } from 'react-router-dom'
import EmptyStore from '.././EmptyStore'
import CartTotalTablet from '../Tablet/CartTotalTablet'


export default function CartProductCardMobile() {
  const cartList = useSelector((state:RootState) => state.mallState.cart)
  const theme = useSelector((state:RootState) => state.mallState.theme)
  const dispatch = useAppDispatch()
  const cartResult = cartList.reduce((acc: { [x: string]: any; hasOwnProperty: (arg0: any) => any }, cur: { id: number }) => {
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
  const minusProduct = (item:productType) => {
    const index = cartList.indexOf(item)
    dispatch(shoppingSlice.actions.deleteCartItem(index))
  }
  const addProduct = (item:productType) => {
    dispatch(shoppingSlice.actions.addToCart(item))
  }
  const deleteProduct = (item:productType) => {
    dispatch(shoppingSlice.actions.deleteProduct(item))
  }
  
  return (
    <>
    <Container>
      <Title theme={theme ? NAVY : WHITE}>Shopping Cart</Title>
      {cartList.length > 0 ?
      <>
        {cartResultKey.map(item => (
        <ProductCard key={cartResult[item][0].id}>
          <ImgContainer>
            <Link to={`/store/${cartResult[item][0].id}`}>
              <ProductImg src={cartResult[item][0].image} alt={cartResult[item][0].title} />
            </Link>
          </ImgContainer>
          <ProductTitle><Link to={`/store/${cartResult[item][0].id}`}>{cartResult[item][0].title}</Link></ProductTitle>
          <ProductPrice>{`$ ${cartResult[item][0].price}`}</ProductPrice>
          <ButtonContainer>
            <Button onClick={() => minusProduct(cartResult[item][0])}><AiOutlineMinus /></Button>
            <Num>{cartResult[item].length}</Num>
            <Button onClick={() => addProduct(cartResult[item][0])}><AiOutlinePlus /></Button>
          </ButtonContainer>
          <Delete onClick={() => deleteProduct(cartResult[item][0])}><RiDeleteBin6Fill /></Delete>
        </ProductCard> 
        ))}
      </>
      :
      <EmptyStore text={'No products in shopping Cart!'}/>
      }
      <CartTotalTablet />
    </Container>
    </>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const Title = styled.h2<{theme:string}>`
  margin-left:20px;
  font-size: 40px;
  text-align:center;
  width: 100vw;
  color: ${props => props.theme}
`

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 10px 0px 20px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 10px;
  width: 90vw;
  height: 400px;
  background-color: white;
`
const ImgContainer = styled.div`
  width: 160px;
  height: 180px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`
const ProductImg = styled.img`
  width: 160px;
  height: 90%;
  margin: 0 30px;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1)
  }
`
const ProductTitle = styled.div`
  font-size: 15px;
  width: 100%;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`
const ProductPrice = styled.div`
  font-size: 15px;
  margin: 15px;
  width: 100%;
  text-align: center;  
`
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0 10px;
  justify-content: center;
  align-items: center;
`
const Button = styled.button`
  width: 30px;
  height: 30px;
  background-color: ${AMAZON_ORANGE};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size : 16px;
`
const Num = styled.div`
  font-size: 15px;
  margin: 0 25px;
`
const Delete = styled.button`
  background-color: ${GRAY2};
  border: none;
  color: ${WHITE};
  font-size: 30px;
  border-radius: 5px;
  display: flex;
  padding: 3px 6px;
  margin-top: 20px;
  cursor: pointer;
`
