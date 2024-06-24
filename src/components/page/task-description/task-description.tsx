import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { TaskCard } from '@/components/business/task-card';
import { BackButton } from '@/components/shared/back-button';
import { HOME } from '@/routes';
import { tasksActions, useAppDispatch } from '@/store';

import './style.scss';

const TaskDescription = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('task');

  const onBackButtonClick = () => {
    dispatch(tasksActions.clearError());
    navigate(HOME);
  };

  return (
    <div className={'container'}>
      <div className={'task-description'}>
        <BackButton
          onClick={onBackButtonClick}
          title={t('back_button')}
          className={'task-description__back-button'}
        />
        <TaskCard />
      </div>
    </div>
  );
};

export default TaskDescription;
