import { Slide, ToastContainer } from 'react-toastify';

import { useAppSelector } from '@/store';

export const NotificationContainer = () => {
  const isDarkTheme = useAppSelector(state => state.app.darkTheme);

  return (
    <ToastContainer
      position={'bottom-right'}
      autoClose={6000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={isDarkTheme ? 'dark' : 'light'}
      transition={Slide}
    />
  );
};
