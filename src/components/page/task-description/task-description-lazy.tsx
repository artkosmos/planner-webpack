import { lazy } from 'react';

export const TaskDescriptionLazy = lazy(
  () => import(/* webpackChunkName: "task" */ './task-description'),
);
