import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import dayjs from 'dayjs';

import notificationService from '@/api/notification.service';

export const useTaskNotifications = () => {
  const { t } = useTranslation('notifications');

  useEffect(() => {
    const today = new Date();
    const lastNotificationTime = localStorage.getItem('lastNotification');

    if (
      !lastNotificationTime ||
      !dayjs(lastNotificationTime).isSame(today, 'day')
    ) {
      notificationService
        .getExpiredAndTodayTasks()
        .then(data => {
          const { todayTasks, expiredTasks } = data;
          const numberOfTodayTasks = todayTasks.length;
          const numberOfExpiredTasks = expiredTasks.length;
          toast.warn(
            t('todayTask', {
              count: numberOfTodayTasks,
              number: numberOfTodayTasks,
            }),
          );
          toast.error(
            t('expiredTask', {
              count: numberOfExpiredTasks,
              number: numberOfExpiredTasks,
            }),
          );

          localStorage.setItem('lastNotification', today.toISOString());
        })
        .catch(() => {
          toast.error('Ошибка при загрузке задач');
        });
    }
  }, []);
};
