import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuid } from 'uuid';

import { mainThunk } from '@/api';
import { Dialog } from '@/components/shared/dialog';
import { InfoTitle } from '@/components/shared/info-title';
import { ListTable } from '@/components/shared/list-table';
import { ButtonPrimary } from '@/components/shared/primary-button';
import {
  EditFormButtons,
  type IEditTaskAction,
  type ITaskFormConfig,
  TaskForm,
} from '@/components/shared/task-form';
import { AppDispatch, useAppSelector } from '@/store';

import './style.scss';

const createTaskFormConfig: ITaskFormConfig = {
  cancelButtonTitle: 'cancel',
  confirmButtonTitle: 'add',
} as const;

export const ListCreator = () => {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(mainThunk.getTaskList());
  }, []);

  const list = useAppSelector(state => state.main.list);
  const isLoading = useAppSelector(state => state.main.isLoading);

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
        const id = uuid().slice(0, idLength);
        dispatch(mainThunk.createTask({ date, title, id }));
        setOpenEditDialog(false);
        break;
      }
    }
  };

  const deleteListHandler = (id: string) => {
    dispatch(mainThunk.deleteTask(id));
  };

  return (
    <div className={'list-creator'}>
      <div className={'list-creator__add-task-block add-task-block'}>
        <Dialog
          title={'Create task'}
          isOpen={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
        >
          <TaskForm
            onAction={onCreateFormAction}
            task={{ id: '', title: '', date: '' }}
            config={createTaskFormConfig}
          />
        </Dialog>
        <ButtonPrimary
          className={'add-task-block__button'}
          title={'Add task'}
          onClick={() => setOpenEditDialog(true)}
        />
      </div>
      <div className={'list-creator__loader'}>
        {isLoading && <CircularProgress />}
      </div>
      <div className={'list-creator__table-block'}>
        {!!list.length && (
          <ListTable list={list} deleteTask={deleteListHandler} />
        )}
        {!list.length && <InfoTitle title={'No available data'} />}
      </div>
    </div>
  );
};
