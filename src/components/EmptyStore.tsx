import React from 'react'
import styled from '@emotion/styled'
import { NAVY, WHITE } from '../constant/color'
import { RootState, useAppDispatch } from '../Store'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { shoppingSlice } from '../Store/productSlice'

interface EmptyStorePropsType {
  text: string
}

export default function EmptyStore(props:EmptyStorePropsType) {
  const dispatch = useAppDispatch()
  const theme = useSelector((state:RootState) => state.mallState.theme)
  return (
    <EmptyContainer>
      <EmptyProduct theme={theme ? NAVY : WHITE}>{props.text}</EmptyProduct>
      <BackToStore onClick={()=>dispatch(shoppingSlice.actions.clearFilter())} className={`btn ${theme ? '' : 'btn--white'}`}><Link to={'/store'}>Back to Store</Link></BackToStore>
    </EmptyContainer>
  )
}

const EmptyContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`
const EmptyProduct = styled.div<{theme:string}>`
  font-size: 30px;
  text-align: center;
  margin-top: 200px;
  color: ${props => props.theme}
`
const BackToStore = styled.button`
  margin-top: 50px;
  width: 20%;
  font-size: 20px;
`
