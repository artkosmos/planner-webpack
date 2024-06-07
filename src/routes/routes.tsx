import { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import { Header } from '@/components/business/header';
import { HomeLazy } from '@/components/page/home';
import { TaskDescriptionLazy } from '@/components/page/task-description';
import { CustomToastContainer } from '@/components/shared/custom-toast-container';
import { NotFound } from '@/components/shared/not-found';
import { useTaskNotifications } from '@/hooks/use-task-notifications';
import { useAppSelector } from '@/store';

import { HOME, TASK } from './constants';

const Layout = () => {
  const isDarkTheme = useAppSelector(state => state.main.darkTheme);
  useTaskNotifications();

  return (
    <>
      <Header />
      <Outlet />
      <CustomToastContainer isDarkTheme={isDarkTheme} />
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
