import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import clsx from 'clsx';

import { CardInfo } from '@/components/business/task-card/components';
import { Card } from '@/components/shared/card';
import { Dialog } from '@/components/shared/dialog';
import { InfoTitle } from '@/components/shared/info-title';
import { ButtonPrimary } from '@/components/shared/primary-button';
import {
  EditFormButtons,
  type IEditTaskAction,
  TaskForm,
} from '@/components/shared/task-form';
import { dateFormats } from '@/constants/date-formats';
import { tasksThunks, useAppDispatch, useAppSelector } from '@/store';

import { getTaskUpdateConfig } from './form-config';

import './style.scss';

type Props = {
  className?: string;
};

export const TaskCard = ({ className }: Props) => {
  const { id } = useParams<string>();
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openImageDialog, setOpenImageDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation('task');

  const currentTask = useAppSelector(state => state.tasks.currentTask);
  const isLoading = useAppSelector(state => state.tasks.isLoading);
  const error = useAppSelector(state => state.tasks.error);
  const isDarkTheme = useAppSelector(state => state.app.darkTheme);

  useEffect(() => {
    dispatch(tasksThunks.getTask(id));
  }, []);

  const formConfig = useMemo(
    () => getTaskUpdateConfig(t, i18n.language, isDarkTheme),
    [t, i18n.language, isDarkTheme],
  );

  const onEditFormAction = ({ name, model }: IEditTaskAction) => {
    switch (name) {
      case EditFormButtons.CANCEL: {
        setOpenEditDialog(false);
        break;
      }
      case EditFormButtons.CONFIRM: {
        dispatch(tasksThunks.updateTask({ t, task: model }));
        setOpenEditDialog(false);
        break;
      }
    }
  };

  const classNames = useMemo(() => {
    return {
      card: clsx('task-card', className),
      title: clsx('task-card__title'),
      list: clsx('task-card__list'),
      info: clsx('task-card__info'),
      imageDialog: clsx('task-card__image-dialog'),
      image: clsx('task-card__image-dialog_image'),
    };
  }, []);

  if (isLoading) {
    return (
      <CircularProgress
        data-testid={'loader'}
        className={'task-card__loader'}
      />
    );
  }

  if (!currentTask || error) {
    return <InfoTitle title={error} />;
  }

  return (
    <Card className={classNames.card}>
      <p className={classNames.title}>{t('card_title')}</p>
      <div className={classNames.info}>
        <CardInfo
          className={classNames.list}
          t={t}
          dateFormat={dateFormats[i18n.language]}
          task={currentTask}
        />
        {currentTask.image && (
          <img
            className={'task-card__image'}
            src={currentTask.image}
            alt={'task image'}
            onClick={() => setOpenImageDialog(true)}
          />
        )}
      </div>
      <ButtonPrimary
        className={'task-card__edit-button'}
        onClick={() => setOpenEditDialog(true)}
        title={t('edit_button')}
      />
      <Dialog title={t('dialog_title')} isOpen={openEditDialog}>
        <TaskForm
          config={formConfig}
          onAction={onEditFormAction}
          task={currentTask}
        />
      </Dialog>
      <Dialog
        isOpen={openImageDialog}
        onClose={() => setOpenImageDialog(false)}
        className={classNames.imageDialog}
        maxWidth={'md'}
      >
        <img
          src={currentTask.image}
          alt={'task-image'}
          className={classNames.image}
        />
      </Dialog>
    </Card>
  );
};
