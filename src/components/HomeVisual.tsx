import React from 'react'
import styled from '@emotion/styled'
import { Desktop, Mobile, Tablet } from '../ReactResponsive/Responsive'


export default function HomeVisual() {
  
  return (
    <Container className='animation'>
      <Desktop>
        <>
      <SlideList> // 
        <SlideImg src={"/images/image1.jpg"} alt='img1' />
      </SlideList>
      <SlideList>
        <SlideImg src={'/images/image2.jpg'} alt='img1' />
      </SlideList>
      <SlideList>
        <SlideImg src='/images/image3.jpg' alt='img1' />
      </SlideList>
      <SlideList>
        <SlideImg src='/images/image4.jpg' alt='img1' />
      </SlideList>
      `</>
      </Desktop>

      <Tablet>
        <>
        <SlideList1>
          <SlideImg1 src='/images/image1.jpg' alt='img1' />
        </SlideList1>
        <SlideList1>
          <SlideImg1 src='/images/image2.jpg' alt='img1' />
        </SlideList1>
        <SlideList1>
          <SlideImg1 src='/images/image3.jpg' alt='img1' />
        </SlideList1>
        <SlideList1>
          <SlideImg1 src='/images/image4.jpg' alt='img1' />
        </SlideList1>
        </>
      </Tablet>

      <Mobile>
        <>
        <SlideList2>
          <SlideImg2 src='/images/image1.jpg' alt='img1' />
        </SlideList2>
        <SlideList2>
          <SlideImg2 src='/images/image2.jpg' alt='img1' />
        </SlideList2>
        <SlideList2>
          <SlideImg2 src='/images/image3.jpg' alt='img1' />
        </SlideList2>
        <SlideList2>
          <SlideImg2 src='/images/image4.jpg' alt='img1' />
        </SlideList2>
        </>
      </Mobile>
    </Container>
  )
} 
const Container = styled.div`
  position: relative;
  display:flex; 
  // justify-content: center;
  // align-items: center;
  width: 400%;
  height: 700px;
  overflow: hidden;
  margin:0 auto;
  margin-top: 90px;
  align-items: start;
  overflow: hidden;
  overflow-x: hidden;
  // left: -100%;
`
const SlideImg = styled.img`
  max-width: 100%;
  margin-left: 50%;
  transform: translateX(-50%)
`
const SlideList = styled.div`
  white-space:no-wrap;
  width: 25%;
  font-size: 0;
  overflow: hidden;
`
const SlideImg1 = styled.img`
  max-width: 200%;
  margin-left: 50%;
  transform: translateX(-50%)
`
const SlideList1 = styled.div`
  white-space:no-wrap;
  width: 25%;
  font-size: 0;
  overflow: hidden;
`
const SlideImg2 = styled.img`
  max-width: 250%;
  margin-left: 50%;
  transform: translateX(-50%)
`
const SlideList2 = styled.div`
  white-space:no-wrap;
  width: 25%;
  font-size: 0;
  overflow: hidden;
`


