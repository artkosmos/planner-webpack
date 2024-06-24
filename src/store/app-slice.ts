import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';

import dayjs from 'dayjs';
import { TFunction } from 'i18next';

import notificationService from '@/api/notification.service';
import { createAppAsyncThunk } from '@/utils/pretyped-async-thunk';

const notificationSettings = {
  autoClose: 6000,
  hideProgressBar: false,
};

export const setTheme = createAppAsyncThunk(
  'app/setTheme',
  async (isDark: boolean) => {
    localStorage.setItem('darkTheme', `${isDark}`);
    return isDark;
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
              notificationSettings,
            );
          } else {
            toast.warn(
              t('todayTask', {
                count: numberOfTodayTasks,
                number: numberOfTodayTasks,
              }),
              notificationSettings,
            );
          }

          if (numberOfExpiredTasks === 0) {
            toast.success(
              t('expiredTask', {
                count: numberOfExpiredTasks,
              }),
              notificationSettings,
            );
          } else {
            toast.error(
              t('expiredTask', {
                count: numberOfExpiredTasks,
                number: numberOfExpiredTasks,
              }),
              notificationSettings,
            );
          }
        }
      }
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      localStorage.setItem('lastNotification', today.toISOString());
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
