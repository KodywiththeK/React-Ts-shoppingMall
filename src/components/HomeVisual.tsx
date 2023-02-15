import React from 'react'
import styled from '@emotion/styled'
import { Desktop, Mobile, Tablet } from '../ReactResponsive/Responsive'
import image1 from '../../images/image1.jpg'
import image2 from '../../images/image2.jpg'
import image3 from '../../images/image3.jpg'
import image4 from '../../images/image4.jpg'


export default function HomeVisual() {
  
  return (
    <>
      <Desktop>
        <>
    <Container className='animation'>
      <SlideList> // 
        <SlideImg src={image1} alt='img1' />
      </SlideList>
      <SlideList>
        <SlideImg src={image2} alt='img2' />
      </SlideList>
      <SlideList>
        <SlideImg src={image3} alt='img3' />
      </SlideList>
      <SlideList>
        <SlideImg src={image4} alt='img4' />
      </SlideList>
    </Container>
      `</>
      </Desktop>

      <Tablet>
        <>
      <Container className='animation'>
        <SlideList1>
          <SlideImg1 src={image1} alt='img1' />
        </SlideList1>
        <SlideList1>
          <SlideImg1 src={image2} alt='img2' />
        </SlideList1>
        <SlideList1>
          <SlideImg1 src={image3} alt='img3' />
        </SlideList1>
        <SlideList1>
          <SlideImg1 src={image4} alt='img4' />
        </SlideList1>
        </Container>
        </>
      </Tablet>

      <Mobile>
        <>
        <Container1 className='animation'>
        <SlideList2>
          <SlideImg2 src={image1} alt='img1' />
        </SlideList2>
        <SlideList2>
          <SlideImg2 src={image2} alt='img2' />
        </SlideList2>
        <SlideList2>
          <SlideImg2 src={image3} alt='img3' />
        </SlideList2>
        <SlideList2>
          <SlideImg2 src={image4} alt='img4' />
        </SlideList2>
        </Container1>
        </>
      </Mobile>
    </>
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
const Container1 = styled.div`
  position: relative;
  display:flex; 
  // justify-content: center;
  // align-items: center;
  width: 400%;
  height: 700px;
  overflow: hidden;
  margin:0 auto;
  margin-top: 70px;
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


