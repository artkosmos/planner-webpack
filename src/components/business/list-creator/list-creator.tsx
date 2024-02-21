import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {v4 as uuid} from "uuid";
import {createTask, deleteTask} from '@/api';
import {
  ButtonPrimary,
  Dialog, EditFormButtons,
  type IEditTaskAction,
  InfoTitle, type ITaskFormConfig,
  ListTable,
  TaskForm
} from "@/components/shared";
import './style.scss'
import {useAppSelector} from "@/store";

const createTaskFormConfig: ITaskFormConfig = {
  cancelButtonTitle: 'cancel',
  confirmButtonTitle: 'add'
} as const

export const ListCreator = () => {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)

  const list = useAppSelector((state) => state.main.list)
  const dispatch = useDispatch<AppDispatch>()

  const onCreateFormAction = ({name, model}: IEditTaskAction) => {
    switch (name) {
      case EditFormButtons.CANCEL:
        setOpenEditDialog(false)
        break;
      case EditFormButtons.CONFIRM:
        const date = model.date
        const title = model.title
        const id = uuid().slice(0, 8)
        dispatch(createTask({title, date, id}))
        setOpenEditDialog(false)
        break;
    }
  }

  const deleteListHandler = (id: string) => {
    dispatch(deleteTask({id}))
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
      {list.length
        ? <ListTable list={list} deleteTask={deleteListHandler}/>
        : <InfoTitle title={'No available data'}/>}
    </div>
  );
};
