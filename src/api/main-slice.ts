import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IList} from "../common";

const slice = createSlice({
  name: 'main',
  initialState: {
    lists: [] as IList[]
  },
  reducers: {
    createList: (state, action: PayloadAction<IList>) => {
      state.lists.unshift({id: action.payload.id, title: action.payload.title, date: action.payload.date})
    },
    deleteList: (state, action: PayloadAction<{id: string}>) => {
      const index = state.lists.findIndex((list) => list.id === action.payload.id)
      if (index !== -1) {
        state.lists.splice(index, 1)
      }
    },
  }
})

export const {createList, deleteList} = slice.actions
export const mainSlice = slice.reducer
