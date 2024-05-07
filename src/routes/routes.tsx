import { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import { Header } from '@/components/business/header';
import { HomeLazy } from '@/components/page/home';
import { TaskDescriptionLazy } from '@/components/page/task-description';
import { NotFound } from '@/components/shared/not-found';

import { HOME, TASK } from './constants';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export const routerConfig = [
  {
    element: <Layout />,
    children: [
      {
        path: HOME,
        element: (
          <Suspense>
            <HomeLazy />
          </Suspense>
        ),
      },
      {
        path: `${TASK}/:id`,
        element: (
          <Suspense>
            <TaskDescriptionLazy />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routerConfig);
