import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITask} from "@/common";

const slice = createSlice({
  name: 'main',
  initialState: {
    list: [] as ITask[]
  },
  reducers: {
    createList: (state, action: PayloadAction<ITask>) => {
      state.list.unshift({id: action.payload.id, title: action.payload.title, date: action.payload.date})
    },
    deleteList: (state, action: PayloadAction<{id: string}>) => {
      const index = state.list.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
  }
})

export const {createList, deleteList} = slice.actions
export const mainSlice = slice.reducer
