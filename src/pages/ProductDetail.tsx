import React from 'react'
import styled from '@emotion/styled';
import { useSelector } from 'react-redux'
import { AMAZON_ORANGE, BLACK1, IVORY, NAVY, WHITE } from '../constant/color'
import { RootState, useAppDispatch } from '../Store'
import { Link, useParams } from 'react-router-dom';
import { productType } from '../Service/getData';
import { shoppingSlice } from '../Store/productSlice';
import { AiFillStar } from 'react-icons/ai';
import { Default, Mobile} from '../ReactResponsive/Responsive';
import ProductDetailMobile from '../components/Mobile/ProductDetailMobile';

export default function ProductDetail() {
  const dispatch = useAppDispatch();
  const theme = useSelector((state:RootState) => state.mallState.theme)
  const dataList = useSelector((state:RootState) => state.mallState.data)
  const cartList = useSelector((state:RootState) => state.mallState.cart)
  const { productId }= useParams();
  const product = dataList.find(item => item.id === Number(productId))

  const addToCart = (item:productType) => {
    if(cartList.includes(item)) {
      const index = cartList.indexOf(item)
      dispatch(shoppingSlice.actions.deleteCartItem(index))
    } else {
      dispatch(shoppingSlice.actions.addToCart(item))
    }
  }
  const starArr = [0,1,2,3,4]
  return (
    <>
  <Default>
    <Container theme={theme ? WHITE : NAVY}>
      <ProductDetailCard>
        <ImageBlock>
          <Image src={product?.image}/>
        </ImageBlock>
        <InfoBlock>
          <TextBlock theme = {theme? BLACK1 : WHITE}>
            <Title>{product?.title}</Title>
            <Description>{product?.description}</Description>
            <Stars>
              {starArr.map((star) => (
                product &&
                <AiFillStar style={{color: `${product.rating.rate <= star ? IVORY : AMAZON_ORANGE}` }} key={star}/> 
              ))}
              <Count>{product?.rating.rate}</Count>
              <Count>({product?.rating.count})</Count>
            </Stars>
            <Price>{`$ ${product?.price}`}</Price>
          </TextBlock>
          <ButtonBlock>
            <Button 
              onClick={() => addToCart(product as productType)} 
              className={`btn ${theme? 'btn--brown' : 'btn--white'}`}
              >
              {cartList.includes(product as productType) ? 'Added✨' : 'ADD to Cart'}
            </Button>
            <Button className={`btn ${theme? 'btn--gold' : 'btn--gold'}`}>
              <Link to={'/cart'}>Go to Cart</Link>
            </Button>
          </ButtonBlock>
        </InfoBlock>
      </ProductDetailCard>
    </Container>
  </Default>

  <Mobile>
    <ProductDetailMobile />
  </Mobile>
    </>
  )
}


const Container = styled.div<{theme:string}>`
  position: relative;
  min-height: 50vh;
  width: 100%;
  top: 90px;
  padding: 30px 0;
  margin-bottom: 90px;
  display: flex;
  background-color: ${props=> props.theme}
`
const ProductDetailCard = styled.div`
  margin: 30px 0 0 40px;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ImageBlock = styled.div`
  width: 350px;
  height: 350px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  margin-right: 40px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 1px 3px 1px #c0c0c0;
`
const Image = styled.img`
  width: 62%;
  height: 70%;
`
const InfoBlock = styled.div`
  width: 60%;  
  margin-right: 40px;
`
const TextBlock = styled.div<{theme:string}>`
  color: ${props => props.theme};
`
const Title = styled.h2`
  margin-top: 0;
  font-size: 30px;
  font-weight: 600;
`
const Description = styled.div`
  font-size: 20px;
  margin-left: 12px;
  margin-bottom: 30px;
  line-height: 28px;
`
const Stars = styled.div`
  display: flex;
  font-size: 25px;
  margin: 10px 12px;
  font-size: 20px;
`
const Count = styled.div`
  font-size: 15px;
  margin-left: 6px;
`
const Price =styled.h3`
  font-size: 26px; 
  margin-left: 12px;
`
const ButtonBlock = styled.div`
  display: flex;
`
const ButtonBlock1 = styled.div`
  display: flex;
  // flex-direction: column;
`
const Button = styled.button`
  margin-right: 10px;
  width: 170px;
  height: 50px;
  font-size: 18px;
  margin-bottom: 10px;
`