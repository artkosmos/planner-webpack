import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { HomeLazy, TaskDescriptionLazy } from '@/components/page';

import { HOME, TASK } from './constants';

export const router = createBrowserRouter([
  {
    path: HOME,
    element: (
      <Suspense fallback={'Loading...'}>
        <HomeLazy />
      </Suspense>
    ),
  },
  {
    path: `${TASK}/:id`,
    element: (
      <Suspense fallback={'Loading...'}>
        <TaskDescriptionLazy />
      </Suspense>
    ),
  },
]);
