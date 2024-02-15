import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITask} from "@/common";

const slice = createSlice({
  name: 'main',
  initialState: {
    list: [] as ITask[]
  },
  reducers: {
    createTask: (state, action: PayloadAction<ITask>) => {
      state.list.unshift({id: action.payload.id, title: action.payload.title, date: action.payload.date})
    },
    deleteTask: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.list.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const index = state.list.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.list[index].title = action.payload.title
        state.list[index].date = action.payload.date
      }
    },
  }
})

export const {createTask, deleteTask, updateTask} = slice.actions
export const mainSlice = slice.reducer
