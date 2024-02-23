import {configureStore} from "@reduxjs/toolkit";
import {mainSlice} from "@/api";
import {type TypedUseSelectorHook, useSelector} from "react-redux";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const store = configureStore({
  reducer: {
    main: mainSlice
  }
})

// @ts-ignore
window.store = store
