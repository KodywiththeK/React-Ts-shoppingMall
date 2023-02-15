import React from 'react'
import styled from '@emotion/styled'
import CartProductCard from '../components/CartProductCard'
import { useSelector } from 'react-redux'
import { RootState } from '../Store'
import { NAVY, WHITE } from '../constant/color'
import CartTotal from '../components/CartTotal'
import { Desktop, Mobile, Tablet } from '../ReactResponsive/Responsive'
import CartProductCardTablet from '../components/Tablet/CartProductCardTablet'
import CartProductCardMobile from '../components/Mobile/CartProductCardMobile'



export default function Cart() {

  const theme = useSelector((state:RootState) => state.mallState.theme)

  return (
    <>
    <Container theme={theme ? WHITE : NAVY}>
      <Desktop>
        <>
        <CartProductCard />
        <CartTotal />
        </>
      </Desktop>

      <Tablet>
        <CartProductCardTablet />
      </Tablet>

      <Mobile>
        <CartProductCardMobile/>
      </Mobile>
    </Container>
    </>
  )
}


const Container = styled.div<{theme:string}>`
  position: relative;
  min-height: 100vh;
  width: 100%;
  top: 90px;
  padding: 30px 0;
  margin-bottom: 90px;
  display: flex;
  background-color: ${props=> props.theme}
`