import { ITask } from '@/common/types';

export const newTask: ITask = {
  id: '',
  title: '',
  date: '',
  image: null,
  important: false,
  isDone: false,
};
export const actualTask: ITask = {
  id: '37dd67fd',
  title: 'existing task',
  date: '1993-12-27T15:12:31',
  image: 'img.png',
  important: true,
  isDone: true,
};
