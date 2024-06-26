import { Slide, ToastContainer } from 'react-toastify';

import { useAppSelector } from '@/store';

export const Notification = () => {
  const isDarkTheme = useAppSelector(state => state.app.darkTheme);

  return (
    <ToastContainer
      position={'bottom-right'}
      autoClose={1000}
      hideProgressBar={true}
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
