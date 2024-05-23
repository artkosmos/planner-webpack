import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { v4 as uuid } from 'uuid';

import { appActions, appThunk } from '@/api';
import { ITask } from '@/common/types';
import { Dialog } from '@/components/shared/dialog';
import { InfoTitle } from '@/components/shared/info-title';
import { ListTable } from '@/components/shared/list-table';
import { ButtonPrimary } from '@/components/shared/primary-button';
import {
  EditFormButtons,
  type IEditTaskAction,
  TaskForm,
} from '@/components/shared/task-form';
import { dateFormats } from '@/constants/date-formats';
import { TASK } from '@/routes';
import { useAppDispatch, useAppSelector } from '@/store';

import { getTaskCreateConfig } from './form-config';

import './style.scss';

const emptyTaskModel: ITask = {
  id: '',
  title: '',
  date: '',
  image: null,
  important: false,
};

export const ListCreator = () => {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation('home');
  const navigate = useNavigate();

  const list = useAppSelector(state => state.main.list);
  const isLoading = useAppSelector(state => state.main.isLoading);
  const error = useAppSelector(state => state.main.error);
  const isAppInitialized = useAppSelector(state => state.main.isInitialized);
  const { search, sortBy } = useAppSelector(state => state.main.listSort);
  const isDarkTheme = useAppSelector(state => state.main.darkTheme);

  useEffect(() => {
    dispatch(appThunk.getTaskList({ search, sortBy })).finally(() =>
      dispatch(appActions.setIsAppInitialized(true)),
    );
  }, [search, sortBy, dispatch]);

  const formConfig = useMemo(
    () => getTaskCreateConfig(t, i18n.language, isDarkTheme),
    [t, i18n.language, isDarkTheme],
  );

  const onCreateFormAction = ({ name, model }: IEditTaskAction) => {
    switch (name) {
      case EditFormButtons.CANCEL: {
        setOpenEditDialog(false);
        break;
      }
      case EditFormButtons.CONFIRM: {
        const idLength = 8;
        const date = model.date;
        const title = model.title;
        const image = model.image;
        const important = model.important;
        const id = uuid().slice(0, idLength);
        dispatch(appThunk.createTask({ date, title, image, id, important }));
        setOpenEditDialog(false);
        break;
      }
    }
  };

  const deleteListHandler = (taskId: string) => {
    dispatch(appThunk.deleteTask(taskId));
  };

  const navigateHandler = (taskId: string) => {
    navigate(`${TASK}/${taskId}`);
  };

  if (error) {
    return <InfoTitle title={error} />;
  }

  return (
    <div className={'list-creator'}>
      <div className={'list-creator__add-task-block add-task-block'}>
        <Dialog title={t('dialog_title')} isOpen={openEditDialog}>
          <TaskForm
            onAction={onCreateFormAction}
            task={emptyTaskModel}
            config={formConfig}
          />
        </Dialog>
        <ButtonPrimary
          className={'add-task-block__button'}
          title={t('create_button')}
          onClick={() => setOpenEditDialog(true)}
          disabled={!isAppInitialized}
        />
      </div>
      {isLoading || !isAppInitialized ? (
        <CircularProgress
          className={'list-creator__loader'}
          data-testid={'loader'}
        />
      ) : (
        <div className={'list-creator__table-block'}>
          {!!list.length && (
            <ListTable
              list={list}
              deleteTask={deleteListHandler}
              onRowClick={navigateHandler}
              dateFormat={dateFormats[i18n.language]}
            />
          )}
          {!list.length && <InfoTitle title={t('no_data')} />}
        </div>
      )}
    </div>
  );
};
