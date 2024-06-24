import { toast } from 'react-toastify';
import { waitFor } from '@testing-library/react';

import { renderWithRedux } from '@/__mocks__/redux-jest';
import notificationService from '@/api/notification.service';
import { ITask, TaskStatus } from '@/common/types';

import { App } from './app';

import '@/__mocks__/match-media-jest';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  RouterProvider: () => <h1>Nested content</h1>,
}));

describe('testing of notifications in app', () => {
  const notificationSettings = {
    autoClose: 6000,
    hideProgressBar: false,
  };

  const localStorageGetItem = jest.spyOn(Storage.prototype, 'getItem');
  localStorageGetItem.mockReturnValue(null);
  const mockedWarningNotification = jest.spyOn(toast, 'warn');
  const mockedErrorNotification = jest.spyOn(toast, 'error');
  const mockedSuccessNotification = jest.spyOn(toast, 'success');
  const mockedGetExpiredAndTodayTasks = jest.spyOn(
    notificationService,
    'getExpiredAndTodayTasks',
  );

  afterEach(() => {
    mockedWarningNotification.mockClear();
    mockedErrorNotification.mockClear();
    mockedSuccessNotification.mockClear();
  });

  test('should display daily notifications when there are appropriate tasks', async () => {
    const expectedResult: { expiredTasks: ITask[]; todayTasks: ITask[] } = {
      expiredTasks: [
        {
          id: '7f6d314f',
          title: 'housework',
          date: '2023-02-13T02:32',
          image: null,
          important: true,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
      ],
      todayTasks: [
        {
          id: '151deb35',
          title: 'dinner',
          date: '2024-03-13T11:32',
          image: null,
          important: false,
          isDone: false,
          status: TaskStatus.TODAY,
        },
      ],
    };

    mockedGetExpiredAndTodayTasks.mockResolvedValueOnce(expectedResult);

    renderWithRedux(<App />);

    await waitFor(() => {
      expect(mockedWarningNotification).toHaveBeenCalledWith(
        'todayTask',
        notificationSettings,
      );
      expect(mockedErrorNotification).toHaveBeenCalledWith(
        'expiredTask',
        notificationSettings,
      );
    });
  });

  test('should display success notifications when no today/expired tasks', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-02-11T12:00'));
    const previousDate = new Date('2024-02-09T12:00');
    const expectedResult: { expiredTasks: ITask[]; todayTasks: ITask[] } = {
      expiredTasks: [],
      todayTasks: [],
    };
    mockedGetExpiredAndTodayTasks.mockResolvedValueOnce(expectedResult);
    localStorageGetItem.mockReturnValueOnce(JSON.stringify(previousDate));

    renderWithRedux(<App />);

    await waitFor(() => {
      expect(mockedSuccessNotification).toHaveBeenCalledWith(
        'todayTask',
        notificationSettings,
      );
      expect(mockedSuccessNotification).toHaveBeenCalledWith(
        'expiredTask',
        notificationSettings,
      );
    });

    jest.useRealTimers();
  });

  test('should not display daily notifications', async () => {
    mockedGetExpiredAndTodayTasks.mockRejectedValueOnce(
      'List is not defined or empty',
    );

    const { store } = renderWithRedux(<App />);

    await waitFor(() =>
      expect(store.getState().app.error).toBe('List is not defined or empty'),
    );
  });
});
