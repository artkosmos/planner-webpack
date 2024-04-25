import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';

import taskService from '@/api';
import { IGetTaskListArgs } from '@/backend';
import { ITask } from '@/common/types';
import { createAppAsyncThunk } from '@/utils/pretyped-async-thunk';

const getTaskList = createAppAsyncThunk(
  'main/getTaskList',
  async ({ search, sortBy }: IGetTaskListArgs) => {
    return await taskService.getTaskList({ search, sortBy });
  },
);

const getTask = createAppAsyncThunk(
  'main/getTask',
  async (id: string, { rejectWithValue }) => {
    try {
      return await taskService.getTask(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const createTask = createAppAsyncThunk(
  'main/createTask',
  async (data: ITask, { dispatch }) => {
    const response = await taskService.createTask(data);
    if (response) {
      return dispatch(getTaskList({}));
    }
  },
);

const deleteTask = createAppAsyncThunk(
  'main/deleteTask',
  async (id: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await taskService.deleteTask(id);
      if (response) {
        const { sortBy, search } = getState().main;
        return dispatch(getTaskList({ sortBy, search }));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const updateTask = createAppAsyncThunk(
  'main/updateTask',
  async (task: ITask, { rejectWithValue, dispatch }) => {
    try {
      const response = await taskService.updateTask(task);
      if (response) {
        return dispatch(getTask(task.id));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const slice = createSlice({
  name: 'main',
  initialState: {
    list: null as ITask[],
    currentTask: null as ITask | null,
    error: null as null | string,
    isLoading: false as boolean,
    isInitialized: true as boolean,
    darkTheme: false as boolean,
    search: '' as string,
    sortBy: '' as string,
  },
  reducers: {
    changeAppTheme: (state, action: PayloadAction<boolean>) => {
      state.darkTheme = action.payload;
    },
    changeInitialization: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTaskList.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.currentTask = action.payload;
      })
      .addCase(createTask.fulfilled, state => {
        state.sortBy = '';
        state.search = '';
      })
      .addCase(getTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addMatcher(isPending, state => {
        state.isLoading = true;
      })
      .addMatcher(isRejected, state => {
        state.isLoading = false;
      })
      .addMatcher(isFulfilled, state => {
        state.isLoading = false;
      });
  },
});

export const mainSlice = slice.reducer;
export const appActions = slice.actions;
export const appThunk = {
  createTask,
  deleteTask,
  updateTask,
  getTask,
  getTaskList,
};
