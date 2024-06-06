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
      resolve => {
        setTimeout(() => {
          const list = getListFromLS();
          const expiredTasks: ITask[] = [];
          const todayTasks: ITask[] = [];
          const today = dayjs(new Date());

          for (const task of list) {
            const taskDate = dayjs(task.date);
            const taskIsDone = task.status === TaskStatus.DONE;

            if (taskIsDone) {
              continue;
            }

            if (taskDate.isSame(today, 'day')) {
              todayTasks.push(task);
            } else if (taskDate.isBefore(today, 'day')) {
              expiredTasks.push(task);
            }
          }
          resolve({ expiredTasks, todayTasks });
        }, timeoutDelay);
      },
    );
  };

  return {
    getExpiredAndTodayTasks,
  };
})();

export default notificationService;
