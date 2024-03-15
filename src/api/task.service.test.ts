import type { ITask } from '@/common/types';

import { mockedTaskList } from './mocks';
import taskService from './task.service';

describe('task service', () => {
  const localStorageSetItem = jest.spyOn(Storage.prototype, 'setItem');
  const localStorageGetItem = jest.spyOn(Storage.prototype, 'getItem');

  beforeEach(() => {
    localStorageGetItem.mockReturnValue(JSON.stringify(mockedTaskList));
    localStorageSetItem.mockClear();
    localStorageGetItem.mockClear();
  });

  describe('get task list method testing', () => {
    const mockedGetTaskList = jest.spyOn(taskService, 'getTaskList');

    beforeEach(() => {
      mockedGetTaskList.mockClear();
    });

    test('task list exists in local storage and should be received', async () => {
      const expectedResult: ITask[] = [
        { id: '85df17d5', title: 'go camping', date: '2023-03-12T04:46:43' },
        { id: '9df3077f', title: 'cinema', date: '2021-02-13T15:23:23' },
        { id: '151dfeb3', title: 'dinner', date: '2019-02-05T02:42:42' },
        { id: '72e14782', title: 'meeting', date: '2018-02-04T15:06:46' },
        { id: '7f6d314f', title: 'housework', date: '2023-02-13T02:32:13' },
      ];

      const result = await taskService.getTaskList();

      expect(mockedGetTaskList).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
      expect(mockedGetTaskList).toHaveBeenCalledTimes(1);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
    });

    test("task list don't exist in local storage", async () => {
      localStorageGetItem.mockReturnValue(null);
      const expectedResult: ITask[] = [];

      const result = await taskService.getTaskList();
      const newStorageValue = JSON.stringify([]);

      expect(mockedGetTaskList).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
      expect(mockedGetTaskList).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenCalledWith('taskList');
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'taskList',
        newStorageValue,
      );
    });
  });

  describe('get task method testing', () => {
    const mockedGetTask = jest.spyOn(taskService, 'getTask');

    beforeEach(() => {
      mockedGetTask.mockClear();
    });

    test('specified task should be received', async () => {
      const taskId = '85df17d5';
      const expectedResult: ITask = {
        id: '85df17d5',
        title: 'go camping',
        date: '2023-03-12T04:46:43',
      };

      const result = await taskService.getTask(taskId);

      expect(mockedGetTask).toHaveBeenCalledWith(taskId);
      expect(result).toEqual(expectedResult);
      expect(mockedGetTask).toHaveBeenCalledTimes(1);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
    });

    test("specified task can't be received due to wrong id", async () => {
      const wrongId = 'wrong-id';
      const expectedResult = new Error("Specified task wasn't found");

      const result = taskService.getTask(wrongId);

      await expect(result).rejects.toEqual(expectedResult);
      expect(mockedGetTask).toHaveBeenCalledWith('wrong-id');
      expect(mockedGetTask).toHaveBeenCalledTimes(1);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
    });
  });

  describe('create task method testing', () => {
    test('new task should be created', async () => {
      const newTask: ITask = {
        id: '94d560ae',
        title: 'go to a cafe',
        date: '2024-12-03T18:30:00',
      };
      const expectedResult: string = 'Task was created successfully';

      const mockedCreateTask = jest.spyOn(taskService, 'createTask');
      const result = await taskService.createTask(newTask);
      const newStorageValue = JSON.stringify([newTask, ...mockedTaskList]);

      expect(mockedCreateTask).toHaveBeenCalledWith(newTask);
      expect(result).toEqual(expectedResult);
      expect(mockedCreateTask).toHaveBeenCalledTimes(1);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(localStorageSetItem).toHaveBeenCalledWith(
        'taskList',
        newStorageValue,
      );
    });
  });

  describe('delete task method testing', () => {
    const mockedDeleteTask = jest.spyOn(taskService, 'deleteTask');

    beforeEach(() => {
      mockedDeleteTask.mockClear();
    });

    test('specified task should be deleted', async () => {
      const taskId = '72e14782';
      const expectedResult: string = 'Task was deleted successfully';

      const result = await taskService.deleteTask(taskId);
      const newStorageValue = JSON.stringify(
        mockedTaskList.filter(item => item.id !== taskId),
      );

      expect(mockedDeleteTask).toHaveBeenCalledWith(taskId);
      expect(result).toEqual(expectedResult);
      expect(mockedDeleteTask).toHaveBeenCalledTimes(1);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(localStorageSetItem).toHaveBeenCalledWith(
        'taskList',
        newStorageValue,
      );
    });

    test("specified task can't delete due to wrong id", async () => {
      const wrongId = 'wrong-id';
      const expectedResult = new Error("Specified task wasn't found");

      const result = taskService.deleteTask(wrongId);

      await expect(result).rejects.toEqual(expectedResult);
      expect(mockedDeleteTask).toHaveBeenCalledWith('wrong-id');
      expect(mockedDeleteTask).toHaveBeenCalledTimes(1);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(localStorageSetItem).not.toHaveBeenCalled();
    });
  });

  describe('update task method testing', () => {
    const mockedUpdateTask = jest.spyOn(taskService, 'updateTask');

    beforeEach(() => {
      mockedUpdateTask.mockClear();
    });

    test('specified task should be updated', async () => {
      const updatedTask = {
        id: '85df17d5',
        title: 'go running',
        date: '2023-03-12T06:00:00',
      };
      const expectedResult: string = 'Task was updated successfully';

      const result = await taskService.updateTask(updatedTask);
      const newStorageValue = JSON.stringify(
        mockedTaskList.map(item =>
          item.id === updatedTask.id ? updatedTask : item,
        ),
      );

      expect(mockedUpdateTask).toHaveBeenCalledWith(updatedTask);
      expect(result).toEqual(expectedResult);
      expect(mockedUpdateTask).toHaveBeenCalledTimes(1);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(localStorageSetItem).toHaveBeenCalledWith(
        'taskList',
        newStorageValue,
      );
    });

    test("specified task can't be updated because of non existing", async () => {
      const updatedTask = {
        id: 'wrong-id',
        title: 'go running',
        date: '2023-03-12T06:00:00',
      };
      const expectedResult = new Error("Specified task wasn't found");

      const result = taskService.updateTask(updatedTask);

      await expect(result).rejects.toEqual(expectedResult);
      expect(mockedUpdateTask).toHaveBeenCalledWith(updatedTask);
      expect(mockedUpdateTask).toHaveBeenCalledTimes(1);
      expect(localStorageGetItem).toHaveBeenCalledWith('taskList');
      expect(localStorageSetItem).not.toHaveBeenCalled();
    });
  });
});
