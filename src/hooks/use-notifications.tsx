import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { appThunks, useAppDispatch } from '@/store';

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('notifications');

  useEffect(() => {
    dispatch(appThunks.getNotifications(t));
  }, []);
};
