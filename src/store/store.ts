import {configureStore} from "@reduxjs/toolkit";
import {mainSlice} from "@/api";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    main: mainSlice
  }
})


// @ts-ignore
window.store = store
