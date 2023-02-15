import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom';
import { BsXLg } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../Store';
import { AMAZON_ORANGE, BLACK1, DARK_NAVY, WHITE } from '../../constant/color';
import { shoppingSlice } from '../../Store/productSlice';


export default function HeaderSearchMobile() {
  const theme = useSelector((state:RootState) => state.mallState.theme)
  const data = useSelector((state:RootState) => state.mallState.data)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('')
  const [searchSectionState, setSearchSectionState] = useState(true)
  const searchHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  const filteredData = searchValue.length > 0 ? data.filter(item => item.title.toLowerCase().split(' ').join('').includes(searchValue.toLowerCase().split(' ').join(''))) : [];
  const submitHandler = (e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate('/store');
    setSearchSectionState(false)
    dispatch(shoppingSlice.actions.setSearchingData(filteredData));
  }
  
  const handleSearchSection = (boolean: boolean) => {
    setSearchSectionState(boolean)
  }
  return (
    <SearchContainer >
      <SearchForm id='form' onSubmit={(e) => submitHandler(e)}>
        <Search tabIndex={0} id='form' 
          type='text' 
          placeholder='Search Amazon' 
          value={searchValue} 
          onFocus={() => {
            handleSearchSection(true) 
          }} 
          onChange={(e) => searchHandler(e)} />
        {searchValue.length> 0 && <IconX onClick={() => setSearchValue('')}><BsXLg /></IconX>}
      </SearchForm>
      {(searchValue.length>0 && searchSectionState) && 
      <SearchSection>
        {filteredData.map((item) => (
          <FilteredProduct 
            tabIndex={0} 
            onClick={() => {
              handleSearchSection(!searchSectionState) 
              return navigate(`/store/${item.id}`)
            }} 
            key={item.id}>
              {item.title}
          </FilteredProduct>
        ) )}
      </SearchSection>}
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 200px;
  width: 30vw;
  height: 230px;
`
const SearchForm = styled.form`
  display: flex;
`
const Search = styled.input`
  margin-right: 5px;
  padding: 0 12px;
  width: 83%;
  min-width: 100px;
  height: 30px;
  font-size: 18px;
`
const IconX = styled.div`
  display: flex;
  align-items: center;
  margin-left: -32px;
  margin-right: 16px;
`
const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  max-height: 300px;
  padding-right: 10px;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
  border-radius: 5px;
  transition: all 0.3s;
`
const FilteredProduct = styled.div`
  width: 96%;
  margin: 0 10px;
  padding: 10px; 
  white-space: wrap;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(0,0,0,0.3)
  }
`