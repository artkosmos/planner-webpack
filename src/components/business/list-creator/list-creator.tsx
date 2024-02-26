import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch, useAppSelector} from "@/store";
import {v4 as uuid} from "uuid";
import {mainThunk} from '@/api';
import {
  ButtonPrimary,
  Dialog, EditFormButtons,
  type IEditTaskAction,
  InfoTitle, type ITaskFormConfig,
  ListTable,
  TaskForm
} from "@/components/shared";
import CircularProgress from '@mui/material/CircularProgress';
import './style.scss'

const createTaskFormConfig: ITaskFormConfig = {
  cancelButtonTitle: 'cancel',
  confirmButtonTitle: 'add'
} as const

export const ListCreator = () => {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(mainThunk.getTaskList())
  }, []);

  const list = useAppSelector((state) => state.main.list)
  const isLoading = useAppSelector((state) => state.main.isLoading)

  const onCreateFormAction = ({name, model}: IEditTaskAction) => {
    switch (name) {
      case EditFormButtons.CANCEL: {
        setOpenEditDialog(false)
        break;
      }
      case EditFormButtons.CONFIRM: {
        const date = model.date
        const title = model.title
        const id = uuid().slice(0, 8)
        dispatch(mainThunk.createTask({date, title, id}))
        setOpenEditDialog(false)
        break;
      }
    }
  }

  const deleteListHandler = (id: string) => {
    dispatch(mainThunk.deleteTask(id))
  }

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
            task={{id: '', title: '', date: ''}}
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
        {isLoading && <CircularProgress/>}
      </div>
      <div className={'list-creator__table-block'}>
        {!!list.length && <ListTable list={list} deleteTask={deleteListHandler}/>}
        {!list.length && <InfoTitle title={'No available data'}/>}
      </div>
    </div>
  );
};
