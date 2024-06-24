import { mockedTaskList } from '@/__mocks__/task-list';
import notificationService from '@/api/notification.service';
import { ITask, TaskStatus } from '@/common/types';

describe('testing of notification service', () => {
  const localStorageGetItem = jest.spyOn(Storage.prototype, 'getItem');

  beforeAll(() => {
    localStorageGetItem.mockReturnValue(JSON.stringify(mockedTaskList));
  });

  afterEach(() => {
    localStorageGetItem.mockClear();
  });

  test('should notify about today and expired tasks', async () => {
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
    jest.useFakeTimers().setSystemTime(new Date('2024-03-13T08:35'));
    const promise = notificationService.getExpiredAndTodayTasks();
    jest.runOnlyPendingTimers();
    const result = await promise;

    expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
    expect(result).toEqual(expectedResult);
    jest.useRealTimers();
  });

  test('should not notify about today and expired tasks if list is empty', async () => {
    localStorageGetItem.mockReturnValueOnce(JSON.stringify([]));
    const expectedResult: string = 'List is not defined or empty';
    let result;

    try {
      result = await notificationService.getExpiredAndTodayTasks();
    } catch (message) {
      result = message;
    }

    expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
    expect(result).toEqual(expectedResult);
  });
});
