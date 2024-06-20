import dayjs from 'dayjs';

import { ITask, TaskStatus } from '@/common/types';

const notificationService = (() => {
  const timeoutDelay = 400;
  const localStorageKey = 'taskList';

  const getListFromLS = () => {
    const storedList = localStorage.getItem(localStorageKey);
    return JSON.parse(storedList) as ITask[];
  };

  const getExpiredAndTodayTasks = () => {
    return new Promise<{ expiredTasks: ITask[]; todayTasks: ITask[] }>(
      (resolve, reject) => {
        setTimeout(() => {
          const list = getListFromLS();
          const expiredTasks: ITask[] = [];
          const todayTasks: ITask[] = [];
          const today = dayjs(new Date());

          if (list && list.length > 0) {
            for (const task of list) {
              const taskDate = dayjs(task.date);
              const taskIsDone = task.status === TaskStatus.DONE;

              if (taskIsDone) {
                continue;
              }

              if (taskDate.isBefore(today)) {
                expiredTasks.push(task);
              } else if (taskDate.isSame(today, 'day')) {
                todayTasks.push(task);
              }
            }
            resolve({ expiredTasks, todayTasks });
          } else {
            reject('List is not defined or empty');
          }
        }, timeoutDelay);
      },
    );
  };

  return {
    getExpiredAndTodayTasks,
  };
})();

export default notificationService;
