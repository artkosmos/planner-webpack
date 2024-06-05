import dayjs from 'dayjs';
import { TFunction } from 'i18next';

import { StarIcon } from '@/assets/icons/star-icon';
import { ITask } from '@/common/types';

type Props = {
  t: TFunction;
  dateFormat: string;
  className?: string;
  task: ITask;
};

export const CardInfo = ({ className, task, t, dateFormat }: Props) => {
  let statusTranslationKey;

  switch (task.status) {
    case 'expired':
      statusTranslationKey = 'status.expired';
      break;
    case 'today':
      statusTranslationKey = 'status.today';
      break;
    case 'actual':
      statusTranslationKey = 'status.actual';
      break;
    case 'done':
      statusTranslationKey = 'status.done';
      break;
    default:
      statusTranslationKey = 'status.unknown';
      break;
  }

  return (
    <ul className={className}>
      <li>
        <div>
          <span className={'task-card__point'}>{t('id')}: </span>
          {task.id}
        </div>
        {task.important && <StarIcon width={30} height={30} />}
      </li>
      <li>
        <span className={'task-card__point'}>{t('name')}:&nbsp;&nbsp;</span>
        {task.title}
      </li>
      <li>
        <span className={'task-card__point'}>{t('date')}:&nbsp;&nbsp;</span>
        {dayjs(task.date).format(dateFormat)}
      </li>
      <li>
        <span className={'task-card__status'}>
          <div
            className={'task-card__status-point'}
            data-status={task.status}
          ></div>
          {t(statusTranslationKey)}
        </span>
      </li>
    </ul>
  );
};
