import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAPI, productType } from "../Service/getData";
import { loadFilterState, loadState, loadTheme, saveCart, saveFilterState, saveTheme } from "./storage";


interface stateType {
  data: productType[],
  searchingData: productType[],
  categorized: string,
  theme: boolean,
  cart: productType[],
  fetchState: boolean,
  filterState: boolean
}

const initialState:stateType = {
  data: [],
  searchingData: [],
  categorized: '',
  theme: loadTheme(),
  cart: loadState(),
  fetchState: true,
  filterState: loadFilterState()
}


export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const response = await fetchAPI()
    // console.log(response)
    return response
  }
)

export const shoppingSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    changeTheme: (state) => {
      saveTheme(!state.theme)
      state.theme = !state.theme;
    },
    changeFilterState: (state) => {
      saveFilterState(!state.filterState)
      state.filterState = !state.filterState;
    },
    categoryFilter: (state, action) => {
      state.categorized = action.payload
    },
    clearFilter: (state) => {
      state.categorized = ''
      state.searchingData = []
      state.data = state.data.sort((a:productType,b:productType) => Number(a.id)-Number(b.id))
    },
    sortLowToHighPrice: (state) => {
      state.data = state.data.sort((a:productType,b:productType) => Number(a.price)-Number(b.price))
    },
    sortHighToLowPrice: (state) => {
      state.data = state.data.sort((a:productType,b:productType) => Number(b.price)-Number(a.price))
    },
    sortLowToHighRate: (state) => {
      state.data = state.data.sort((a:productType,b:productType) => Number(a.rating.rate)-Number(b.rating.rate))
    },
    sortHighToLowRate: (state) => {
      state.data = state.data.sort((a:productType,b:productType) => Number(b.rating.rate)-Number(a.rating.rate))
    },
    addToCart: (state, action:PayloadAction<productType>) => {
      const newCart = [...state.cart, action.payload];
      saveCart(newCart)
      return {
        ...state, cart: newCart
      }
    },
    deleteCartItem: (state,action:PayloadAction<number>) => {
      const newArr = state.cart.filter((_, index) => index !== action.payload)
      saveCart(newArr)
      return {
        ...state, cart: state.cart.filter((_, index) => index !== action.payload)
      }
    },
    deleteProduct: (state,action:PayloadAction<productType>) => {
      const newArr = state.cart.filter((item) => item.id !== action.payload.id)
      saveCart(newArr)
      return {
        ...state, cart: state.cart.filter((item) => item.id !== action.payload.id)
      }
    },
    clearCart: (state) => {
      saveCart([])
      return {...state, cart: []}
    },
    setSearchingData: (state, action) => {
      return { ...state, searchingData: action.payload}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled,(state, action: PayloadAction<productType[]>) => {
      state.data = action.payload
    })
    builder.addCase(fetchProduct.pending, (state) => {
      state.fetchState = true
    })
    builder.addCase(fetchProduct.rejected, (state) => {
      state.fetchState = false
    })
  }
})

export const shoppingReducer = shoppingSlice.reducer