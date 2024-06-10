import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch, appThunks } from '@/store';

export const useDarkTheme = () => {
  const appSettingDark = JSON.parse(localStorage.getItem('darkTheme'));
  const systemSettingDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  const dispatch = useDispatch<AppDispatch>();
  const [isDark, setIsDark] = useState(
    appSettingDark !== null ? appSettingDark : systemSettingDark,
  );

  useEffect(() => {
    dispatch(appThunks.setTheme(isDark));
  }, [isDark, dispatch]);

  if (isDark) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  return { isDark, setIsDark };
};
