import React from 'react'
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { makeResult, productType } from '../Service/getData'
import { RootState, useAppDispatch } from '../Store';
import { shoppingSlice } from '../Store/productSlice';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';
import EmptyStore from './EmptyStore';


interface ProductCardPropsType {
  starRate : number
}

export default function ProductCard(props: ProductCardPropsType) {
  const dispatch = useAppDispatch()
  const product = useSelector((state:RootState) => state.mallState.data).filter(item => item.rating.rate > props.starRate)
  const categorizedData = makeResult(product)
  const categorized = useSelector((state:RootState) => state.mallState.categorized)
  const cartList = useSelector((state:RootState) => state.mallState.cart)
  const SearchingData = useSelector((state:RootState) => state.mallState.searchingData)
  let pickedData:productType[] = []
  SearchingData.length > 0 ? 
    (categorized.length>0 ? pickedData=categorizedData[categorized].filter(item => SearchingData.includes(item))  : pickedData = product.filter(item => SearchingData.includes(item))) : 
    (categorized.length>0 ? pickedData = categorizedData[categorized] : pickedData = product)

  const addToCart = (item:productType) => {
    if(cartList.includes(item)) {
      const index = cartList.indexOf(item)
      dispatch(shoppingSlice.actions.deleteCartItem(index))
    } else {
      dispatch(shoppingSlice.actions.addToCart(item))
    }
  }

  return (
    <Container>
    {pickedData.length > 0 ?
    <>
    {pickedData.map((item) => (
      <Card key={item.id}>
        <Link to={`/store/${item.id}`}>
        <ImageDiv>
          <CardImg src={item.image} alt={item.title}/>
        </ImageDiv>
        </Link>
        <CardBody>
          <Link to={`/store/${item.id}`}><CardTitle>{item.title}</CardTitle></Link>
          <CardPrice>$ {item.price}</CardPrice>
          <StarRating item={item}></StarRating>
          <AddCart 
            className={`btn ${cartList.includes(item) ? 'checked' : ''}`} 
            onClick={() => addToCart(item)}
            >
              {cartList.includes(item) ? 'Remove from Cart' : 'ADD to Cart'}
          </AddCart>
        </CardBody>
      </Card>
    ))}
    </> : 
    <EmptyStore text={'Sorry, There are no such products😞'} />
    }
    </Container>
  )
}
const Container = styled.section`
  z-index: 1;
  display: flex;
  list-style: none;
  padding: 0;
  width: 100%;
  margin: 32px 0 32px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px 40px;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  padding: 8px;

  border: 1px solid #c0c0c0;
  width: 320px;
  height: 450px;
  background-color: white;

  box-shadow: 1px 1px 3px 1px #c0c0c0;
  overflow: hidden;
`
const ImageDiv =styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const CardImg = styled.img`
  margin: 50px 10px 0px 10px;
  width: 130px;
  height: 150px;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.15)
  }
`
const CardBody = styled.div`
  width: 100%;
`
const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  text-align: start;
  margin: 10px;
  cursor: pointer;
`
const CardPrice = styled.div`
  font-size: 18px;
  margin-left: 12px;
`

const AddCart = styled.button`
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  margin-bottom: 10px;
  width: 200px;
  letter-spacing: 0.2px;
`