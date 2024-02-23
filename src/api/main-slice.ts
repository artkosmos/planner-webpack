import {createSlice, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {ITask} from "@/common";
import taskService from "@/api";
import {createAppAsyncThunk} from "@/utils";

const slice = createSlice({
  name: 'main',
  initialState: {
    list: [] as ITask[],
    currentTask: null as ITask | null,
    error: null as null | string,
    isLoading: false as boolean,
  },
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskList.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.currentTask = action.payload
      })
      .addCase(getTask.rejected, (state, action) => {
        state.error = action.payload
      })
      .addMatcher(isPending, (state) => {
        state.isLoading = true
      })
      .addMatcher(isRejected, (state) => {
        state.isLoading = false
      })
      .addMatcher(isFulfilled, (state) => {
        state.isLoading = false
      })
  }
})

const getTask = createAppAsyncThunk(
  'main/getTask',
  async (id: string, {rejectWithValue}) => {
    try {
      return await taskService.getTask(id)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const getTaskList = createAppAsyncThunk(
  'main/getTaskList',
  async (_, {rejectWithValue}) => {
    try {
      return await taskService.getTaskList()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const createTask = createAppAsyncThunk(
  'main/createTask',
  async (data: ITask, {rejectWithValue, dispatch}) => {
    try {
      const response = await taskService.createTask(data)
      if (response) {
        return dispatch(getTaskList())
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const deleteTask = createAppAsyncThunk(
  'main/deleteTask',
  async (id: string, {rejectWithValue, dispatch}) => {
    try {
      const response = await taskService.deleteTask(id)
      if (response) {
        return dispatch(getTaskList())
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const updateTask = createAppAsyncThunk(
  'main/updateTask',
  async (task: ITask, {rejectWithValue, dispatch}) => {
    try {
      const response = await taskService.updateTask(task)
      if (response) {
        return dispatch(getTask(task.id))
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const {setError} = slice.actions
export const mainSlice = slice.reducer
export const mainThunk = {createTask, deleteTask, updateTask, getTask, getTaskList}
