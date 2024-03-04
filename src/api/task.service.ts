import { ITask } from '@/common';

const taskService = (() => {
  const timeoutDelay = 500;
  const localStorageKey = 'taskList';
  const storedList = localStorage.getItem(localStorageKey);
  let taskList: ITask[];

  const updateLocalStorage = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(taskList));
  };

  if (storedList) {
    taskList = JSON.parse(storedList);
  } else {
    taskList = [];
    updateLocalStorage();
  }

  const getTask = (id: string) => {
    return new Promise<ITask>((resolve, reject) => {
      setTimeout(() => {
        const task = taskList.find(item => item.id === id);
        if (task) {
          resolve(task);
        } else {
          reject(new Error("Specified task wasn't found"));
        }
      }, timeoutDelay);
    });
  };

  const getTaskList = () => {
    return new Promise<ITask[]>((resolve, reject) => {
      setTimeout(() => {
        if (taskList) {
          resolve([...taskList]);
        } else {
          reject(new Error('Request error. Data not received'));
        }
      }, timeoutDelay);
    });
  };

  const createTask = ({ id, title, date }: ITask) => {
    return new Promise<string>(resolve => {
      setTimeout(() => {
        const newTask = { id, title, date };
        taskList.unshift(newTask);
        updateLocalStorage();
        resolve('Task was created successfully');
      }, timeoutDelay);
    });
  };

  const deleteTask = (id: string) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const index = taskList.findIndex(item => item.id === id);
        if (index !== -1) {
          taskList.splice(index, 1);
          updateLocalStorage();
          resolve('Task was deleted successfully');
        } else {
          reject(new Error("Specified task wasn't found"));
        }
      }, timeoutDelay);
    });
  };

  const updateTask = ({ id, title, date }: ITask) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const index = taskList.findIndex(item => item.id === id);
        if (index !== -1) {
          taskList[index] = { id, title, date };
          updateLocalStorage();
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
