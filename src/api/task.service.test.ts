import { mockedTaskList } from '@/__mocks__/task-list';
import type { ITask } from '@/common/types';
import { TaskStatus } from '@/common/types';

import taskService from './task.service';

describe('task service', () => {
  const localStorageSetItem = jest.spyOn(Storage.prototype, 'setItem');
  const localStorageGetItem = jest.spyOn(Storage.prototype, 'getItem');

  beforeAll(() => {
    localStorageGetItem.mockReturnValue(JSON.stringify(mockedTaskList));
  });

  afterEach(() => {
    localStorageSetItem.mockClear();
    localStorageGetItem.mockClear();
  });

  describe('get task list method testing', () => {
    test('task list exists in local storage and should be received', async () => {
      const expectedResult: ITask[] = [
        {
          id: '85df17d5',
          title: 'go camping',
          date: '2023-03-12T04:46',
          image: null,
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '9df3077f',
          title: 'cinema',
          date: '2021-02-13T15:23',
          image: null,
          important: false,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '151deb35',
          title: 'dinner',
          date: '2024-03-13T11:32',
          image: null,
          important: false,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
        {
          id: '72e14782',
          title: 'meeting',
          date: '2018-02-04T15:06',
          image: 'img.png',
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '7f6d314f',
          title: 'housework',
          date: '2023-02-13T02:32',
          image: null,
          important: true,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
      ];

      const result = await taskService.getTaskList({});

      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });

    test("task list don't exist in local storage", async () => {
      localStorageGetItem.mockReturnValueOnce(null);
      const expectedResult: ITask[] = [];

      const result = await taskService.getTaskList({});

      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });

    test('task list should be received by search substr', async () => {
      const searchSubstr = 'cinema';
      const expectedResult: ITask[] = [
        {
          id: '9df3077f',
          title: 'cinema',
          date: '2021-02-13T15:23',
          image: null,
          important: false,
          isDone: true,
          status: TaskStatus.DONE,
        },
      ];

      const result = await taskService.getTaskList({ search: searchSubstr });

      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });

    test('task list should be sorted by name asc', async () => {
      const sortBy = 'name_a-z';
      const expectedResult: ITask[] = [
        {
          id: '9df3077f',
          title: 'cinema',
          date: '2021-02-13T15:23',
          image: null,
          important: false,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '151deb35',
          title: 'dinner',
          date: '2024-03-13T11:32',
          image: null,
          important: false,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
        {
          id: '85df17d5',
          title: 'go camping',
          date: '2023-03-12T04:46',
          image: null,
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '7f6d314f',
          title: 'housework',
          date: '2023-02-13T02:32',
          image: null,
          important: true,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
        {
          id: '72e14782',
          title: 'meeting',
          date: '2018-02-04T15:06',
          image: 'img.png',
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
      ];

      const result = await taskService.getTaskList({ sortBy });

      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });

    test('task list should be sorted by name desc', async () => {
      const sortBy = 'name_z-a';
      const expectedResult: ITask[] = [
        {
          id: '72e14782',
          title: 'meeting',
          date: '2018-02-04T15:06',
          image: 'img.png',
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '7f6d314f',
          title: 'housework',
          date: '2023-02-13T02:32',
          image: null,
          important: true,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
        {
          id: '85df17d5',
          title: 'go camping',
          date: '2023-03-12T04:46',
          image: null,
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '151deb35',
          title: 'dinner',
          date: '2024-03-13T11:32',
          image: null,
          important: false,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
        {
          id: '9df3077f',
          title: 'cinema',
          date: '2021-02-13T15:23',
          image: null,
          important: false,
          isDone: true,
          status: TaskStatus.DONE,
        },
      ];

      const result = await taskService.getTaskList({ sortBy });

      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });

    test('task list should be sorted by date first', async () => {
      const sortBy = 'date_first';
      const expectedResult: ITask[] = [
        {
          id: '72e14782',
          title: 'meeting',
          date: '2018-02-04T15:06',
          image: 'img.png',
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '9df3077f',
          title: 'cinema',
          date: '2021-02-13T15:23',
          image: null,
          important: false,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '7f6d314f',
          title: 'housework',
          date: '2023-02-13T02:32',
          image: null,
          important: true,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
        {
          id: '85df17d5',
          title: 'go camping',
          date: '2023-03-12T04:46',
          image: null,
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '151deb35',
          title: 'dinner',
          date: '2024-03-13T11:32',
          image: null,
          important: false,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
      ];

      const result = await taskService.getTaskList({ sortBy });

      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });

    test('task list should be sorted by date latest', async () => {
      const sortBy = 'date_latest';
      const expectedResult: ITask[] = [
        {
          id: '151deb35',
          title: 'dinner',
          date: '2024-03-13T11:32',
          image: null,
          important: false,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
        {
          id: '85df17d5',
          title: 'go camping',
          date: '2023-03-12T04:46',
          image: null,
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '7f6d314f',
          title: 'housework',
          date: '2023-02-13T02:32',
          image: null,
          important: true,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
        {
          id: '9df3077f',
          title: 'cinema',
          date: '2021-02-13T15:23',
          image: null,
          important: false,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '72e14782',
          title: 'meeting',
          date: '2018-02-04T15:06',
          image: 'img.png',
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
      ];

      const result = await taskService.getTaskList({ sortBy });

      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });

    test('task list should be filtered by importance', async () => {
      const filterBy = 'important';
      const expectedResult: ITask[] = [
        {
          id: '85df17d5',
          title: 'go camping',
          date: '2023-03-12T04:46',
          image: null,
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '72e14782',
          title: 'meeting',
          date: '2018-02-04T15:06',
          image: 'img.png',
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '7f6d314f',
          title: 'housework',
          date: '2023-02-13T02:32',
          image: null,
          important: true,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
      ];

      const result = await taskService.getTaskList({ filterBy });

      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });

    test('task list should be filtered by expired tasks', async () => {
      const filterBy = 'expired';
      const expectedResult: ITask[] = [
        {
          id: '151deb35',
          title: 'dinner',
          date: '2024-03-13T11:32',
          image: null,
          important: false,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
        {
          id: '7f6d314f',
          title: 'housework',
          date: '2023-02-13T02:32',
          image: null,
          important: true,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
      ];

      const result = await taskService.getTaskList({ filterBy });

      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });

    test('task list should be filtered by done tasks', async () => {
      const filterBy = 'done';
      const expectedResult: ITask[] = [
        {
          id: '85df17d5',
          title: 'go camping',
          date: '2023-03-12T04:46',
          image: null,
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '9df3077f',
          title: 'cinema',
          date: '2021-02-13T15:23',
          image: null,
          important: false,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '72e14782',
          title: 'meeting',
          date: '2018-02-04T15:06',
          image: 'img.png',
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
      ];

      const result = await taskService.getTaskList({ filterBy });

      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });

    test('task list should be filtered by not completed tasks', async () => {
      const filterBy = 'not_done';
      const expectedResult: ITask[] = [
        {
          id: '151deb35',
          title: 'dinner',
          date: '2024-03-13T11:32',
          image: null,
          important: false,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
        {
          id: '7f6d314f',
          title: 'housework',
          date: '2023-02-13T02:32',
          image: null,
          important: true,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
      ];

      const result = await taskService.getTaskList({ filterBy });

      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });

    test('task list should be filtered by today tasks', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2024-03-13T08:35'));
      const filterBy = 'today';
      const expectedResult: ITask[] = [
        {
          id: '151deb35',
          title: 'dinner',
          date: '2024-03-13T11:32',
          image: null,
          important: false,
          isDone: false,
          status: TaskStatus.TODAY,
        },
      ];

      const promise = taskService.getTaskList({ filterBy });
      jest.runOnlyPendingTimers();
      const result = await promise;

      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
      jest.useRealTimers();
    });

    test('task list should be filtered by actual tasks', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2024-02-11T12:00'));
      const filterBy = 'actual';
      const expectedResult: ITask[] = [
        {
          id: '151deb35',
          title: 'dinner',
          date: '2024-03-13T11:32',
          image: null,
          important: false,
          isDone: false,
          status: TaskStatus.ACTUAL,
        },
      ];

      const promise = taskService.getTaskList({ filterBy });
      jest.runOnlyPendingTimers();
      const result = await promise;

      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
      jest.useRealTimers();
    });

    test("task list shouldn't be sorted/filtered due to wrong sorting key", async () => {
      const sortBy = 'sort';
      const filterBy = 'filter';
      const expectedResult: ITask[] = [
        {
          id: '85df17d5',
          title: 'go camping',
          date: '2023-03-12T04:46',
          image: null,
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '9df3077f',
          title: 'cinema',
          date: '2021-02-13T15:23',
          image: null,
          important: false,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '151deb35',
          title: 'dinner',
          date: '2024-03-13T11:32',
          image: null,
          important: false,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
        {
          id: '72e14782',
          title: 'meeting',
          date: '2018-02-04T15:06',
          image: 'img.png',
          important: true,
          isDone: true,
          status: TaskStatus.DONE,
        },
        {
          id: '7f6d314f',
          title: 'housework',
          date: '2023-02-13T02:32',
          image: null,
          important: true,
          isDone: false,
          status: TaskStatus.EXPIRED,
        },
      ];

      const result = await taskService.getTaskList({ sortBy, filterBy });

      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });
  });

  describe('get task method testing', () => {
    const mockedGetTask = jest.spyOn(taskService, 'getTask');

    test('specified task should be received', async () => {
      const taskId = '85df17d5';
      const expectedResult: ITask = {
        id: '85df17d5',
        title: 'go camping',
        date: '2023-03-12T04:46',
        image: null,
        important: true,
        isDone: true,
        status: TaskStatus.DONE,
      };

      const result = await taskService.getTask(taskId);

      expect(mockedGetTask).toHaveBeenCalledWith(taskId);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(result).toEqual(expectedResult);
    });

    test("specified task can't be received due to wrong id", async () => {
      const wrongId = 'wrong-id';
      const expectedResult = new Error("Specified task wasn't found");

      const result = taskService.getTask(wrongId);

      await expect(result).rejects.toEqual(expectedResult);
      expect(mockedGetTask).toHaveBeenCalledWith('wrong-id');
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
    });
  });

  describe('create task method testing', () => {
    test('new task should be created', async () => {
      const newTask: ITask = {
        id: '94d560ae',
        title: 'go to a cafe',
        date: '2025-06-22T18:30:00',
        image: null,
        important: false,
        isDone: false,
      };
      const expectedResult: string = 'Task was created successfully';

      const mockedCreateTask = jest.spyOn(taskService, 'createTask');
      const result = await taskService.createTask(newTask);
      const updatedList = JSON.stringify([newTask, ...mockedTaskList]);

      expect(mockedCreateTask).toHaveBeenCalledWith(newTask);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(localStorageSetItem).toHaveBeenCalledWith('taskList', updatedList);
      expect(result).toEqual(expectedResult);
    });

    test('creating task should define list if it is undefined', async () => {
      localStorageGetItem.mockReturnValueOnce(null);
      const newTask: ITask = {
        id: '94d560ae',
        title: 'go to a cafe',
        date: '2025-06-22T18:30:00',
        image: null,
        important: false,
        isDone: false,
      };
      const expectedResult: string = 'Task was created successfully';

      const mockedCreateTask = jest.spyOn(taskService, 'createTask');
      const result = await taskService.createTask(newTask);
      const newList = JSON.stringify([newTask]);

      expect(mockedCreateTask).toHaveBeenCalledWith(newTask);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(localStorageSetItem).toHaveBeenCalledWith('taskList', newList);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('delete task method testing', () => {
    const mockedDeleteTask = jest.spyOn(taskService, 'deleteTask');

    test('existing task should be deleted', async () => {
      const taskId = '72e14782';
      const expectedResult: string = 'Task was deleted successfully';

      const result = await taskService.deleteTask(taskId);
      const updatedList = JSON.stringify(
        mockedTaskList.filter(item => item.id !== taskId),
      );

      expect(mockedDeleteTask).toHaveBeenCalledWith(taskId);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(localStorageSetItem).toHaveBeenCalledWith('taskList', updatedList);
      expect(result).toEqual(expectedResult);
    });

    test("specified task can't delete due to wrong id", async () => {
      const wrongId = 'wrong-id';
      const expectedResult = new Error("Specified task wasn't found");

      const result = taskService.deleteTask(wrongId);

      await expect(result).rejects.toEqual(expectedResult);
      expect(mockedDeleteTask).toHaveBeenCalledWith('wrong-id');
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(localStorageSetItem).not.toHaveBeenCalled();
    });
  });

  describe('update task method testing', () => {
    const mockedUpdateTask = jest.spyOn(taskService, 'updateTask');

    test('existing task should be updated', async () => {
      const updatedTask: ITask = {
        id: '85df17d5',
        title: 'go running',
        date: '2023-03-12T06:00:00',
        image: null,
        important: false,
        isDone: false,
      };
      const expectedResult: string = 'Task was updated successfully';

      const result = await taskService.updateTask(updatedTask);
      const updatedList = JSON.stringify(
        mockedTaskList.map(item =>
          item.id === updatedTask.id ? updatedTask : item,
        ),
      );

      expect(mockedUpdateTask).toHaveBeenCalledWith(updatedTask);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(localStorageSetItem).toHaveBeenCalledWith('taskList', updatedList);
      expect(result).toEqual(expectedResult);
    });

    test("specified task can't be updated because of non existing", async () => {
      const updatedTask: ITask = {
        id: 'wrong-id',
        title: 'go running',
        date: '2023-03-12T06:00:00',
        image: null,
        important: false,
        isDone: false,
      };
      const expectedResult = new Error("Specified task wasn't found");

      const result = taskService.updateTask(updatedTask);

      await expect(result).rejects.toEqual(expectedResult);
      expect(mockedUpdateTask).toHaveBeenCalledWith(updatedTask);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(localStorageSetItem).not.toHaveBeenCalled();
    });
  });
});
