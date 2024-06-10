import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';

import dayjs from 'dayjs';
import { TFunction } from 'i18next';

import notificationService from '@/api/notification.service';
import { createAppAsyncThunk } from '@/utils/pretyped-async-thunk';

export const setTheme = createAppAsyncThunk(
  'app/setTheme',
  async (isDark: boolean, { rejectWithValue }) => {
    try {
      localStorage.setItem('darkTheme', `${isDark}`);
      return isDark;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getNotifications = createAppAsyncThunk(
  'app/getNotifications',
  async (t: TFunction, { rejectWithValue }) => {
    const today = new Date();

    try {
      const lastNotificationTime = localStorage.getItem('lastNotification');

      if (
        !lastNotificationTime ||
        !dayjs(lastNotificationTime).isSame(today, 'day')
      ) {
        const response = await notificationService.getExpiredAndTodayTasks();
        if (response) {
          const { todayTasks, expiredTasks } = response;
          const numberOfTodayTasks = todayTasks.length;
          const numberOfExpiredTasks = expiredTasks.length;

          if (numberOfTodayTasks === 0) {
            toast.success(
              t('todayTask', {
                count: numberOfTodayTasks,
              }),
            );
          } else {
            toast.warn(
              t('todayTask', {
                count: numberOfTodayTasks,
                number: numberOfTodayTasks,
              }),
            );
          }

          if (numberOfExpiredTasks === 0) {
            toast.success(
              t('expiredTask', {
                count: numberOfExpiredTasks,
              }),
            );
          } else {
            toast.error(
              t('expiredTask', {
                count: numberOfExpiredTasks,
                number: numberOfExpiredTasks,
              }),
            );
          }

          localStorage.setItem('lastNotification', today.toISOString());
        }
      }
    } catch (err) {
      toast.error(t('request_error'));
      return rejectWithValue(err);
    }
  },
);

const appSlice = createSlice({
  name: 'app',
  initialState: {
    darkTheme: false as boolean,
    lastNotification: null as string | null,
    error: null as null | string,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getNotifications.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(setTheme.fulfilled, (state, action) => {
        state.darkTheme = action.payload;
      });
  },
});

export const appReducer = appSlice.reducer;
export const appThunks = { getNotifications, setTheme };
