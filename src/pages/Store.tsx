import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { BLACK1, NAVY, WHITE } from '../constant/color';
import {BsToggleOn, BsToggleOff} from 'react-icons/bs'
import { RootState, useAppDispatch } from '../Store';
import { shoppingSlice } from '../Store/productSlice';
import Filter from '../components/Filter'
import { Default, Mobile } from '../ReactResponsive/Responsive';
import FilterMobile from '../components/Mobile/FilterMobile';
import ProductCardMobile from '../components/Mobile/ProductCardMobile';

export default function Store() {
  const dispatch = useAppDispatch();
  const theme = useSelector((state:RootState) => state.mallState.theme)
  const isFilterOn = useSelector((state:RootState) => state.mallState.filterState)
  const category = useSelector((state:RootState) => state.mallState.categorized)
  const [starRate, setStarRate] = useState(-1) 
  
  const getStarRate = (starNum:number) => {
    setStarRate(starNum)
  }
  const handleFilterState = () => {
    dispatch(shoppingSlice.actions.changeFilterState())
  }

  return (
    <>
    <Section theme={theme ? WHITE : NAVY}> 
      <Default>
      <>
      <Filter filterState={isFilterOn} starRate={getStarRate}/>
      <ToggleButton theme={theme} state={isFilterOn} onClick={handleFilterState}>
        {isFilterOn ? <BsToggleOn/> : <BsToggleOff /> } <br/>
        <FilterState>{isFilterOn ? 'Filter OFF': `Show Filter`}</FilterState>
      </ToggleButton>
      <ProductContainer state={isFilterOn}>
        <Title style={{color: theme? BLACK1 : WHITE}}>{category ? category.toUpperCase() : 'All PRODUCT LIST'}</Title>
        <ProductCard starRate={starRate}/>        
      </ProductContainer>
      </>
      </Default>
      
      <Mobile>
        <>
      <FilterMobile filterState={isFilterOn} starRate={getStarRate}/>
      <ToggleButton1 theme={theme} onClick={handleFilterState}>
        {isFilterOn ? <BsToggleOn/> : <BsToggleOff /> } <br/>
        <FilterState>{isFilterOn ? 'Filter OFF': `Show Filter`}</FilterState>
      </ToggleButton1>
      <ProductContainer1 >
        <Title style={{color: theme? BLACK1 : WHITE}}>{category ? category.toUpperCase() : 'All PRODUCT LIST'}</Title>
        <ProductCardMobile starRate={starRate}/>        
      </ProductContainer1>
        </>
      </Mobile>
    </Section>
    </>
  )
}
  
const Section = styled.section<{theme:string}>`
  position: relative;
  min-height: 100vh;
  width: 100%;
  top: 70px;
  margin-bottom: 70px;
  display: flex;
  background-color: ${props=> props.theme}
`

const ProductContainer = styled.div<{state:boolean}>`
  width: 100%;
  min-height: 100vh;
  padding: 0 50px;
  transition: margin-left 0.5s;
  ${props => props.state ? 'margin-left: 340px' : 'margin-left: 0'}
`
const ProductContainer1 = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 50px;
  transition: margin-left 0.5s;
  // margin-left: 340px;
`
const ToggleButton = styled.button<{theme:boolean, state:boolean}>`
  display: flex;
  align-items: center;
  position: fixed;
  font-size: 35px;
  ${props => props.theme ? 'background-color:  white' : 'background-color:  #232e3f'};
  border: none;
  cursor: pointer;
  margin: 65px 0 0 20px;
  transition: transform 0.5s;
  ${props => props.theme ? 'border: 1px solid black' : 'border: 1px solid white'};
  border-radius: 10px;
  ${props => props.theme ? 'color:  black' : 'color:  white'};
  ${props => props.state ? 'transform: translate3d(160px, -20px, 0)' : 'transform: translate3d(0, 0, 0)'};
`
const ToggleButton1 = styled.button<{theme:boolean}>`
  display: flex;
  align-items: center;
  position: fixed;
  font-size: 35px;
  ${props => props.theme ? 'background-color:  white' : 'background-color:  #232e3f'};
  border: none;
  cursor: pointer;
  margin: 25px 0 0 20px;
  transition: transform 0.5s;
  ${props => props.theme ? 'border: 1px solid black' : 'border: 1px solid white'};
  border-radius: 10px;
  ${props => props.theme ? 'color:  black' : 'color:  white'};
`
const FilterState = styled.span `
  display: inline-block;
  margin-left: 10px;
  font-size: 20px;
`

const Title = styled.h2`
  margin-left:20px;
  margin-top: 70px;
  font-size: 40px;
  text-align:center;
`

