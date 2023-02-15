import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux';
import { makeResult, } from '../Service/getData';
import { AppDispatch, RootState } from '../Store/index';
import { BLACK1, WHITE, AMAZON_ORANGE} from '../constant/color';
import { shoppingSlice } from '../Store/productSlice';
import { AiFillStar } from 'react-icons/ai'


interface FilterPropsType {
  starRate: (num:number) => void;
  filterState: boolean
}

export default function Filter(props:FilterPropsType) {
  const dispatch = useDispatch<AppDispatch>()

  const data = useSelector((state:RootState) => state.mallState.data)
  const theme = useSelector((state:RootState) => state.mallState.theme)

  const productKey:string[] = data ? Object.keys(makeResult(data)) : []
  const starArr = [0,1,2,3,4]

  const [sortStatus, setSortStatus] = useState('')
  const [categoryStatus, setCategoryStatus] = useState('')
  
  const [star, setStar] = useState(-1)

  const starRatingHandler = (index: number) => {
    setStar(index)
    props.starRate(index)
  }

  const sortLowToHighPrice =(radio:string) => {
    dispatch(shoppingSlice.actions.sortLowToHighPrice())
    setSortStatus(radio)
  }
  const sortHighToLowPrice =(radio:string) => {
    dispatch(shoppingSlice.actions.sortHighToLowPrice())
    setSortStatus(radio)
  }
  const sortLowToHighRate =(radio:string) => {
    dispatch(shoppingSlice.actions.sortLowToHighRate())
    setSortStatus(radio)
  }
  const sortHighToLowRate =(radio:string) => {
    dispatch(shoppingSlice.actions.sortHighToLowRate())
    setSortStatus(radio)
  }

  const categoryFilter = (item: string) => {
    if(item === 'All Product List') {
      dispatch(shoppingSlice.actions.categoryFilter(''))
    } else {
      dispatch(shoppingSlice.actions.categoryFilter(item))
    }
    setCategoryStatus(item)
  }
  const clearFilter = () => {
    dispatch(shoppingSlice.actions.clearFilter())
    // dispatch(fetchProduct())
    dispatch(shoppingSlice.actions.setSearchingData([]))
    setSortStatus('')
    setCategoryStatus('')
    setStar(-1)
    props.starRate(-1)
  }


  return (
    <ProductFilter state={props.filterState} style={{color: theme? BLACK1 : WHITE}} theme={theme ? '#ddebee' : '#232e3f'}>
        <FilterTitle>Product Filter</FilterTitle>
        <CategoryContainer>
          <CategoryTitle>Categories</CategoryTitle>
          <CategoryButton className={`btn btn--${theme ? 'brown' : 'reverse'} ${categoryStatus === 'All Product List' ? 'checked' : ''}`} >
            <CategoryRadio
              onChange={() => categoryFilter( 'All Product List' )} 
              type="radio" 
              id={'default'} 
              name='category' 
              value={'Show ALL'} 
              checked={categoryStatus === 'All Product List'}
              />
            <CategoryLabel htmlFor={'default'}>{'Show All'}</CategoryLabel>
          </CategoryButton>
          {productKey.sort().map((item, index) => (
          <CategoryButton key={index} className={`btn btn--${theme ? 'brown' : 'reverse'} ${categoryStatus === item ? 'checked' : ''}`} >
            <CategoryRadio 
              onChange={() => categoryFilter( item )}
              type="radio" 
              id={item} 
              name='category' 
              value={item} 
              checked={categoryStatus === item}
              />
            <CategoryLabel htmlFor={item}>{item}</CategoryLabel>
          </CategoryButton>
          ))}
        </CategoryContainer>
        <SortContainer>
          <CategoryTitle>Sort in orders</CategoryTitle>
          <SortBox>
            <SortTitle>By price:</SortTitle>
            <ButtonBox>
              <SortButton className={`btn btn--${theme ? 'brown' : 'reverse'} ${sortStatus === "Low to high price" ? 'checked' : ''}`}>
                  <SortInput onChange={() => sortLowToHighPrice("Low to high price")} type="radio" id="low" name="filter" value="Low to high price" checked={sortStatus === "Low to high price"}/>
                <SortLabel htmlFor="low">Low to high price</SortLabel>
              </SortButton>
              <SortButton className={`btn btn--${theme ? 'brown' : 'reverse'} ${sortStatus === "High to low price" ? 'checked' : ''}`}>
                <SortInput onChange={() => sortHighToLowPrice("High to low price")} type="radio" id="high" name="filter" value="High to low price" checked={sortStatus === "High to low price"}/>
                <SortLabel htmlFor="high">High to low price</SortLabel>
              </SortButton>
            </ButtonBox>
          </SortBox>
          <SortBox>
            <SortTitle> By star rate :</SortTitle>
            <ButtonBox>
              <SortButton className={`btn btn--${theme ? 'brown' : 'reverse'} ${sortStatus === "Low to high rate" ? 'checked' : ''}`}>
                <SortInput onChange={() => sortLowToHighRate("Low to high rate")} type="radio" id="few" name="filter" value="Low to high rate" checked={sortStatus === "Low to high rate"}/>
                <SortLabel htmlFor="few">Low to high rate</SortLabel>
              </SortButton>
              <SortButton className={`btn btn--${theme ? 'brown' : 'reverse'} ${sortStatus === "High to low rate" ? 'checked' : ''}`}>
                <SortInput onChange={() => sortHighToLowRate("High to low rate")} type="radio" id="many" name="filter" value="High to low price" checked={sortStatus === "High to low rate"}/>
                <SortLabel htmlFor="many">High to low rate</SortLabel>
              </SortButton>
            </ButtonBox>
          </SortBox>
          <StarRatingContainer>
            <SortTitle>Star Rate :</SortTitle>
            <StarRating>
              {starArr.map((item) => (
                <AiFillStar style={star>=item ? {color: `${theme ? AMAZON_ORANGE : AMAZON_ORANGE}`} : {color: WHITE}} onClick={() => starRatingHandler(item)} key={item}/> 
              ))}
            </StarRating>
          </StarRatingContainer>
        </SortContainer>


      <ClearButton onClick={clearFilter} className={`btn btn--${theme ? 'brown' : 'white'}`}>Clear Filter</ClearButton>
    </ProductFilter>
  )
}

const ProductFilter = styled.nav<{theme:string, state: boolean}>`
  background-color: ${props=> props.theme};
  color: #fff;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  position: fixed;
  top: 90px;
  height: 100%;
  transition: left 0.5s;
  display: flex;
  ${props => props.state ? 'left: 0;' : 'left: -340px;'}
  align-items: center;
`
const FilterTitle = styled.h2`
  margin: 70px 0 0 0;
  font-size: 35px;
  font-weight: 500;
  text-align: center;
  `
const CategoryContainer = styled.div`
  width: 100%;
  height: 280px;
  display: flex;
  align-items: center;
  flex-direction: column;
  
`
const CategoryTitle = styled.h3`
  text-align: center;
  font-size: 24px;
  margin: 20px 0 8px 0;
`
const CategoryButton = styled.button`
  display: flex;
  width: 60%;
  padding: 5px;
  margin: 5px;
  font-size: 18px;
  font-weight: 500;
  // background-color: ;
`
const CategoryRadio = styled.input`
  appearance: none;  
  cursor: pointer;
`
const CategoryLabel = styled.label`
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
`
const SortContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const SortBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const SortTitle = styled.h4`
  margin: 0 18px;
`
const ButtonBox = styled.div`
  text-align: first;
  margin: 10px 15px 10px 0;
`
const SortButton = styled.button`
  display:  flex;
  justify-content: center;
  width: 150px;
  margin: 5px 0;
  padding: 4px 0px;
  font-size: 15px;
  font-weight: 500;
  // background-color: ;
`
const SortInput = styled.input`
  appearance: none;
`
const SortLabel = styled.label`
  cursor: pointer;
  width: 100%;
`
const StarRatingContainer = styled.div`
  display: flex;
  align-items: center;
` 
const StarRating = styled.div`
  display: flex;
  font-size: 25px;
  margin: 10px 20px;
`
const ClearButton = styled.button`
  margin-top: 30px;
  text-align: center;
  marin: auto;
`