import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import clsx from 'clsx';
import dayjs from 'dayjs';

import { mainThunk } from '@/api';
import { Card } from '@/components/shared/card';
import { Dialog } from '@/components/shared/dialog';
import { InfoTitle } from '@/components/shared/info-title';
import { ButtonPrimary } from '@/components/shared/primary-button';
import {
  EditFormButtons,
  type IEditTaskAction,
  type ITaskFormConfig,
  TaskForm,
} from '@/components/shared/task-form';
import { type AppDispatch, useAppSelector } from '@/store';

import './style.scss';

type Props = {
  className?: string;
};

export const TaskCard = ({ className }: Props) => {
  const { id } = useParams<string>();
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('task');

  const currentTask = useAppSelector(state => state.main.currentTask);
  const isLoading = useAppSelector(state => state.main.isLoading);
  const error = useAppSelector(state => state.main.error);
  const isDarkTheme = useAppSelector(state => state.main.darkTheme);

  useEffect(() => {
    dispatch(mainThunk.getTask(id));
  }, []);

  const updateTaskFormConfig: ITaskFormConfig = useMemo(() => {
    return {
      cancelButtonTitle: t('edit_form_config.cancel_button'),
      confirmButtonTitle: t('edit_form_config.edit_button'),
      imageButtonTitle: t('edit_form_config.image_button_text'),
      dateFieldLabel: t('edit_form_config.date_label'),
      nameFieldLabel: t('edit_form_config.name_label'),
      dateRequiredValidationMsg: t('edit_form_config.date_validation'),
      nameRequiredValidationMsg: t('edit_form_config.name_validation'),
      nameFieldRegExp: '[a-z0-9а-я\\s]+$',
      checkboxLabel: t('edit_form_config.checkbox_label'),
    } as const;
  }, [t]);

  const onEditFormAction = ({ name, model }: IEditTaskAction) => {
    switch (name) {
      case EditFormButtons.CANCEL: {
        setOpenEditDialog(false);
        break;
      }
      case EditFormButtons.CONFIRM: {
        const { title, date, image, important } = model;
        dispatch(mainThunk.updateTask({ title, date, image, important, id }));
        setOpenEditDialog(false);
        break;
      }
    }
  };

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

  const classNames = {
    card: clsx('task-card', isDarkTheme && 'task-card_dark', className),
    title: clsx('task-card__title', isDarkTheme && 'task-card__title_dark'),
    list: clsx('task-card__list', isDarkTheme && 'task-card__list_dark'),
    info: clsx('task-card__info'),
  };

  return (
    <Card className={classNames.card}>
      <p className={classNames.title}>{t('card_title')}</p>
      <div className={classNames.info}>
        <ul className={classNames.list}>
          <li>
            <span className={'task-card__point'}>{t('id')}: </span>
            {currentTask.id}
          </li>
          <li>
            <span className={'task-card__point'}>{t('name')}:&nbsp;&nbsp;</span>
            {currentTask.title}
          </li>
          <li>
            <span className={'task-card__point'}>{t('date')}:&nbsp;&nbsp;</span>
            {dayjs(currentTask.date).format('DD.MM.YYYY hh:mm:ss a')}
          </li>
        </ul>
        {currentTask.image && (
          <img
            className={'task-card__image'}
            src={currentTask.image}
            alt={'task image'}
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
          config={updateTaskFormConfig}
          onAction={onEditFormAction}
          task={currentTask}
        />
      </Dialog>
    </Card>
  );
};
