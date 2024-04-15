import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { appActions } from '@/api';
import { AppDispatch } from '@/store';

export const useDarkTheme = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const isDarkTheme = localStorage.getItem('darkTheme');
    if (isDarkTheme === 'true') {
      setIsDark(true);
      dispatch(appActions.changeAppTheme(true));
    } else if (isDarkTheme === null) {
      localStorage.setItem('darkTheme', 'false');
    }
  }, []);

  if (isDark) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  return { isDark, setIsDark };
};
