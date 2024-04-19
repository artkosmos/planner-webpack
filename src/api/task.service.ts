import { ITask } from '@/common/types';

const taskService = (() => {
  const timeoutDelay = 500;
  const localStorageKey = 'taskList';

  const getListFromLS = () => {
    const storedList = localStorage.getItem(localStorageKey);
    return JSON.parse(storedList) as ITask[];
  };

  const setListToLS = (list: ITask[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(list));
  };

  const getTask = (id: string) => {
    return new Promise<ITask>((resolve, reject) => {
      setTimeout(() => {
        const list = getListFromLS();
        const task = list?.find(item => item.id === id);
        if (task) {
          resolve(task);
        } else {
          reject(new Error("Specified task wasn't found"));
        }
      }, timeoutDelay);
    });
  };

  const getTaskList = (substr: string) => {
    return new Promise<ITask[]>(resolve => {
      setTimeout(() => {
        const list = getListFromLS();
        if (list) {
          if (substr) {
            resolve(list.filter(task => task.title.includes(substr)));
          } else {
            resolve(list);
          }
        } else {
          resolve([]);
        }
      }, timeoutDelay);
    });
  };

  const createTask = ({ id, title, date, image }: ITask) => {
    return new Promise<string>(resolve => {
      setTimeout(() => {
        const newTask = { id, title, date, image };
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

  const updateTask = ({ id, title, date, image }: ITask) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const list = getListFromLS();
        const index = list?.findIndex((item: ITask) => item.id === id);
        if (index !== -1) {
          list[index] = { id, title, date, image };
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
