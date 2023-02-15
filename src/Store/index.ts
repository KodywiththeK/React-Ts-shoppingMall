import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { shoppingSlice } from "./productSlice";
// import Store from "../pages/Store";


export const store = configureStore({
  reducer: {
    mallState: shoppingSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()