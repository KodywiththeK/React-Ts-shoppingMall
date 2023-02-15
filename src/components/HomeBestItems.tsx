import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../Store'
import { makeResult } from '../Service/getData'
import { Default, Mobile } from '../ReactResponsive/Responsive'
import { shoppingSlice } from '../Store/productSlice'



export default function HomeBestItems() {
  const dispatch = useAppDispatch();
  const data = useSelector((state:RootState) => state.mallState.data)
  const theme = useSelector((state:RootState) => state.mallState.theme)
  const fetchState = useSelector((state:RootState) => state.mallState.fetchState)
  const product = makeResult(data)
  const productKey:string[] = product ? Object.keys(product) : []
  const tmp = ['Welcome', 'to', 'Amazon']


  const bestItems = []
  if(product ) {
    for(let i=0; i<productKey.length; i++) {
      let cnt = [0,0];
      for(let j=0; j<product[productKey[i]].length; j++) {
        if(cnt[0] < product[productKey[i]][j].rating.rate) {
          cnt[0] = product[productKey[i]][j].rating.rate
          cnt[1] = j
        }
      }
      bestItems.push(product[productKey[i]][cnt[1]])
    }
  }
  if(!data) {
    return (
      <Container theme={theme ? '#fff' : '#333'}>
      <Title>Checkout the Hottest Products in Amazon Now!</Title>
      <Section>
      {tmp.map(item => (
        <Item key={item}>
          <ItemText>{item}</ItemText>
          {fetchState ?<>
          <ItemImg src='../images/loader.svg' alt='loading...' style={{width: '50px'}}/>
          <ItemTitle><span>Loading...</span></ItemTitle></> :
          <><ItemImg src='../images/error-solid-60.png' alt='failed' style={{width: '50px', height: '50px', margin: '100px 0'}}/>
          <ItemTitle><span>Sorry, try it later</span></ItemTitle></>}
        </Item>
        ))}
      </Section>
    </Container>
    )
  }

  return (
    <Container theme={theme ? '#fff' : '#333'}>
      <Default>
      <Title>Checkout the Hottest Products in Amazon Now!</Title>
      </Default>
      <Mobile>
      <Title>Hottest Products Now!</Title>
      </Mobile>
      <Button onClick={()=> {dispatch(shoppingSlice.actions.clearFilter())}} className='btn'><Link to='/store'>Go to Store</Link></Button>
      <Section>
      {bestItems.map(item => (
        <Item key={item.id}>
          <ItemText>{item.category.toUpperCase()}</ItemText>
          <ItemImg src={item.image} alt={`${item.category}'s best item`}/>
          <ItemTitle><span>{item.title}</span></ItemTitle>
          <ShowMore className='btn btn--gold'><Link to={`/store/${item.id}`}>Show more</Link></ShowMore>
        </Item>
        ))}
      </Section>
    </Container>
  )
}

const Container = styled.div<{theme:string}>`
  display: flex;
  flex-wrap: wrap;
  margin-top: -320px;
  width: 100%;
  background-color: ${props => props.theme};
`

const Title = styled.h2`
  width: 100%;
  font-size : 30px;
  font-weight: 600;
  text-align: center;
  // margin-top: 46vh;
  z-index: 1;
`
const Button = styled.button`
  // position: absolute;  
  width: 250px;
  height: 60px;
  font-size: 22px;
  margin-left: 50%;
  transform: translateX(-50%);
  // margin-top: 32%;
  z-index: 9;
`
const Section = styled.section`
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
  gap: 20px;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  padding: 8px;

  border: 1px solid #c0c0c0;
  width: 300px;
  height: 450px;
  background-color: white;

  box-shadow: 1px 1px 3px 1px #c0c0c0;
  overflow: hidden;

  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.07)
  }
`
const ItemText = styled.div`
  margin: 20px 0;
  font-size: 24px;
  font-weight: 600;
`
const ItemImg = styled.img`
  width: 200px;
  height: 230px;
  margin-bottom: 20px;
`
const ItemTitle = styled.div`
  display: block;
  margin: 10px;
  padding: 0 10px;
  box-sizing: border-box;

  width: 100%;
  font-size : 20px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ShowMore = styled.button`
  margin-top: 10px;
  transition: all 0.5s ease;
`