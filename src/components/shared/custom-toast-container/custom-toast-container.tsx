import { Slide, ToastContainer } from 'react-toastify';

type Props = {
  isDarkTheme?: boolean;
};

export const CustomToastContainer = ({ isDarkTheme }: Props) => {
  return (
    <ToastContainer
      position={'bottom-right'}
      autoClose={5000}
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
