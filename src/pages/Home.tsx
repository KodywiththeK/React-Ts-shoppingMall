import React from 'react'
import styled from '@emotion/styled'
import HomeVisual from '../components/HomeVisual'
import HomeBestItems from '../components/HomeBestItems'

export default function Home() {
  return (
    <Container>
      <HomeVisual />
      <HomeBestItems />
    </Container>
  )
}


const Container = styled.div`
  overflow-x: hidden;
`