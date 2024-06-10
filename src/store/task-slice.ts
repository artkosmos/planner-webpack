import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import taskService from '@/api';
import { IGetTaskListArgs } from '@/backend';
import { ITask } from '@/common/types';
import { createAppAsyncThunk } from '@/utils/pretyped-async-thunk';

const getTaskList = createAppAsyncThunk(
  'tasks/getTaskList',
  async ({ search, sortBy, filterBy }: IGetTaskListArgs) => {
    return await taskService.getTaskList({ search, sortBy, filterBy });
  },
);

const getTask = createAppAsyncThunk(
  'tasks/getTask',
  async (id: string, { rejectWithValue }) => {
    try {
      return await taskService.getTask(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const createTask = createAppAsyncThunk(
  'tasks/createTask',
  async (data: ITask, { dispatch }) => {
    const response = await taskService.createTask(data);
    if (response) {
      return dispatch(getTaskList({}));
    }
  },
);

const deleteTask = createAppAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await taskService.deleteTask(id);
      if (response) {
        const { sortBy, search } = getState().tasks.listSort;
        return dispatch(getTaskList({ sortBy, search }));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const updateTask = createAppAsyncThunk(
  'tasks/updateTask',
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

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: null as ITask[],
    currentTask: null as ITask | null,
    error: null as null | string,
    isLoading: true as boolean,
    listSort: {
      search: '' as string,
      sortBy: '' as string,
      filterBy: '' as string,
    },
  },
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.listSort.search = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.listSort.sortBy = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.listSort.filterBy = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTaskList.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTaskList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(getTaskList.rejected, state => {
        state.isLoading = false;
      })
      .addCase(getTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTask = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, state => {
        state.isLoading = false;
        state.listSort.sortBy = '';
        state.listSort.search = '';
        state.listSort.filterBy = '';
      })
      .addCase(createTask.rejected, state => {
        state.isLoading = false;
      })
      .addCase(deleteTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
export const tasksThunks = {
  createTask,
  deleteTask,
  updateTask,
  getTask,
  getTaskList,
};
