import { toast } from 'react-toastify';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TFunction } from 'i18next';

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

const createTask = createAppAsyncThunk<void, { t: TFunction; task: ITask }>(
  'tasks/createTask',
  async ({ t, task }, { dispatch }) => {
    const response = await taskService.createTask(task);
    if (response) {
      await dispatch(getTaskList({}));
      toast.success(t('notifications.create_success'));
      return;
    }
  },
);

const deleteTask = createAppAsyncThunk<void, { t: TFunction; id: string }>(
  'tasks/deleteTask',
  async ({ t, id }, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await taskService.deleteTask(id);
      if (response) {
        const { sortBy, search } = getState().tasks.listSort;
        await dispatch(getTaskList({ sortBy, search }));
        toast.success(t('notifications.delete_success'));
        return;
      }
    } catch (error) {
      toast.error(t('notifications.delete_error'));
      return rejectWithValue(error.message);
    }
  },
);

const updateTask = createAppAsyncThunk<void, { t: TFunction; task: ITask }>(
  'tasks/updateTask',
  async ({ t, task }, { rejectWithValue, dispatch }) => {
    try {
      const response = await taskService.updateTask(task);
      if (response) {
        await dispatch(getTask(task.id));
        toast.success(t('notifications.update_success'));
        return;
      }
    } catch (error) {
      toast.error(t('notifications.update_error'));
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
