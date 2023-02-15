import React from 'react'
import styled from '@emotion/styled'
import { AiFillStar } from 'react-icons/ai'
import { AMAZON_ORANGE, IVORY } from '../constant/color'
import { productType } from '../Service/getData'

interface StarRatingPropsType {
  item: productType
}

export default function StarRating(props:StarRatingPropsType) {
  const starArr = [0,1,2,3,4]

  return (
    <Stars>
      {starArr.map((star) => (
        props.item &&
        <AiFillStar style={{color: props.item.rating.rate <= star ? IVORY : AMAZON_ORANGE, }} key={star}/> 
      ))}
      <Count>{props.item?.rating.rate}</Count>
      <Count>({props.item?.rating.count})</Count>
    </Stars>
  )
}
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