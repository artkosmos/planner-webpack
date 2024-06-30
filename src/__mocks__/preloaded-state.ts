import { TaskStatus } from '@/common/types';
import { RootState } from '@/store';

export const preloadedState: RootState = {
  app: {
    darkTheme: false,
    lastNotification: '2021-02-13T15:23',
    error: null,
  },
  tasks: {
    list: [
      {
        id: 'a2b4f891',
        title: 'buy groceries',
        date: '2024-01-22T10:00',
        image: null,
        important: false,
        isDone: true,
        status: TaskStatus.DONE,
      },
      {
        id: 'b3c6d582',
        title: 'doctor appointment',
        date: '2023-09-30T14:45',
        image: null,
        important: true,
        isDone: true,
        status: TaskStatus.DONE,
      },
    ],
    currentTask: null,
    error: null,
    isLoading: false,
    listSort: {
      search: '',
      sortBy: '',
      filterBy: '',
    },
  },
};
