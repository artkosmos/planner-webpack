import dayjs from 'dayjs';

import { IGetTaskListArgs } from '@/backend';
import { ITask, TaskStatus } from '@/common/types';

const taskService = (() => {
  const timeoutDelay = 400;
  const localStorageKey = 'taskList';

  const getListFromLS = () => {
    const storedList = localStorage.getItem(localStorageKey);
    return JSON.parse(storedList) as ITask[];
  };

  const setListToLS = (list: ITask[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(list));
  };

  const searchTasks = (list: ITask[], search: string) => {
    return list.filter(task => task.title.includes(search));
  };

  const sortTasks = (list: ITask[], sortBy: string) => {
    switch (sortBy) {
      case 'date_first':
        list.sort((a, b) => a.date.localeCompare(b.date));
        return list;
      case 'date_latest':
        list.sort((a, b) => b.date.localeCompare(a.date));
        return list;
      case 'name_a-z':
        list.sort((a, b) => a.title.localeCompare(b.title));
        return list;
      case 'name_z-a':
        list.sort((a, b) => b.title.localeCompare(a.title));
        return list;
      default:
        return list;
    }
  };

  const filterTask = (list: ITask[], filterBy: string) => {
    switch (filterBy) {
      case 'actual':
        return list.filter(task => task.status === TaskStatus.ACTUAL);
      case 'expired':
        return list.filter(task => task.status === TaskStatus.EXPIRED);
      case 'today':
        return list.filter(task => task.status === TaskStatus.TODAY);
      case 'done':
        return list.filter(task => task.status === TaskStatus.DONE);
      case 'important':
        return list.filter(task => task.important);
      default:
        return list;
    }
  };

  const setStatusForTask = (task: ITask, referenceDate: Date) => {
    const taskDate = dayjs(task.date);
    let status = TaskStatus.ACTUAL;

    if (task.isDone) {
      status = TaskStatus.DONE;
    } else if (taskDate.isBefore(dayjs(referenceDate))) {
      status = TaskStatus.EXPIRED;
    } else if (taskDate.isSame(dayjs(referenceDate), 'day')) {
      status = TaskStatus.TODAY;
    }

    return { ...task, status };
  };

  const setStatus = (input: ITask | ITask[]) => {
    const today = new Date();
    if (Array.isArray(input)) {
      return input.map(task => setStatusForTask(task, today));
    } else {
      return setStatusForTask(input, today);
    }
  };

  const getTaskList = (args: IGetTaskListArgs) => {
    return new Promise<ITask[]>(resolve => {
      setTimeout(() => {
        let list = getListFromLS();
        list = setStatus(list) as ITask[];
        setListToLS(list);

        if (list) {
          if (args.search) {
            list = searchTasks(list, args.search);
          }
          if (args.sortBy) {
            list = sortTasks(list, args.sortBy);
          }
          if (args.filterBy) {
            list = filterTask(list, args.filterBy);
          }

          resolve(list);
        } else {
          resolve([]);
        }
      }, timeoutDelay);
    });
  };

  const getTask = (id: string) => {
    return new Promise<ITask>((resolve, reject) => {
      setTimeout(() => {
        const list = getListFromLS();
        const task = list?.find(item => item.id === id);
        if (task) {
          const taskWithStatus = setStatus(task) as ITask;
          resolve(taskWithStatus);
        } else {
          reject(new Error("Specified task wasn't found"));
        }
      }, timeoutDelay);
    });
  };

  const createTask = ({ id, title, date, image, important, isDone }: ITask) => {
    return new Promise<string>(resolve => {
      setTimeout(() => {
        const newTask = { id, title, date, image, important, isDone };
        const list = getListFromLS();
        if (list) {
          list.unshift(newTask);
          setListToLS(list);
        } else {
          setListToLS([newTask]);
        }
        resolve('Task was created successfully');
      }, timeoutDelay);
    });
  };

  const deleteTask = (id: string) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const list = getListFromLS();
        const index = list?.findIndex(item => item.id === id);
        if (index !== -1) {
          list.splice(index, 1);
          setListToLS(list);
          resolve('Task was deleted successfully');
        } else {
          reject(new Error("Specified task wasn't found"));
        }
      }, timeoutDelay);
    });
  };

  const updateTask = ({
    id,
    title,
    date,
    image,
    important,
    status,
    isDone,
  }: ITask) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const list = getListFromLS();
        const index = list?.findIndex((item: ITask) => item.id === id);
        if (index !== -1) {
          list[index] = { id, title, date, image, important, status, isDone };
          setListToLS(list);
          resolve('Task was updated successfully');
        } else {
          reject(new Error("Specified task wasn't found"));
        }
      }, timeoutDelay);
    });
  };

  return {
    getTask,
    getTaskList,
    createTask,
    deleteTask,
    updateTask,
  };
})();

export default taskService;
