import type { ITask } from '@/common/types';
import { TaskStatus } from '@/common/types';

export const mockedTaskList: ITask[] = [
  {
    id: '85df17d5',
    title: 'go camping',
    date: '2023-03-12T04:46',
    image: null,
    important: true,
    isDone: true,
    status: TaskStatus.ACTUAL,
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
    status: TaskStatus.TODAY,
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
