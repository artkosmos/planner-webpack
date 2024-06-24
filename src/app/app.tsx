import { RouterProvider } from 'react-router-dom';

import { Notification } from '@/components/business/notification';
import { useNotifications } from '@/hooks/use-notifications';
import { router } from '@/routes';

export const App = () => {
  useNotifications();

  return (
    <>
      <RouterProvider router={router} />
      <Notification />
    </>
  );
};
