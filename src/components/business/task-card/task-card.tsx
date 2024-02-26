import React, {useEffect, useState} from 'react';
import {ButtonPrimary, Card, Dialog, InfoTitle, type ITaskFormConfig} from "@/components/shared";
import {useParams} from "react-router-dom";
import './style.scss'
import clsx from "clsx";
import {type AppDispatch, useAppSelector} from "@/store";
import {EditFormButtons, TaskForm, type IEditTaskAction} from "@/components/shared";
import CircularProgress from '@mui/material/CircularProgress';
import {useDispatch} from "react-redux";
import dayjs from "dayjs";
import {mainThunk} from "@/api";

type Props = {
  className?: string
}

const updateTaskFormConfig: ITaskFormConfig = {
  cancelButtonTitle: 'cancel',
  confirmButtonTitle: 'save'
} as const

export const TaskCard = ({className}: Props) => {
  const {id} = useParams<string>()
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const currentTask = useAppSelector(state => state.main.currentTask)
  const isLoading = useAppSelector((state) => state.main.isLoading)
  const error = useAppSelector((state) => state.main.error)

  useEffect(() => {
    dispatch(mainThunk.getTask(id))
  }, []);

  const classNames = clsx(className, 'task-card')

  const onEditFormAction = ({name, model}: IEditTaskAction) => {
    switch (name) {
      case EditFormButtons.CANCEL: {
        setOpenEditDialog(false)
        break;
      }
      case EditFormButtons.CONFIRM: {
        const {title, date} = model
        dispatch(mainThunk.updateTask({title, date, id}))
        setOpenEditDialog(false)
        break;
      }
    }
  }

  const dialogCloseHandler = () => {
    setOpenEditDialog(false)
  }

  if (isLoading) {
    return <CircularProgress className={'task-card__loader'}/>
  }

  if (!currentTask) {
    return <InfoTitle title={error}/>
  }

  return (
    <div className={classNames}>
      <Card>
        <p className={'task-card__title'}>GENERAL INFORMATION</p>
        <ul className={'task-card__list'}>
          <li><span className={'task-card__point'}>Name: </span>{currentTask.title}</li>
          <li><span className={'task-card__point'}>ID: </span>{currentTask.id}</li>
          <li><span className={'task-card__point'}>Date: </span>{dayjs(currentTask.date).format('DD.MM.YYYY HH:mm:ss')}
          </li>
        </ul>
        <ButtonPrimary className={'task-card__edit-button'} onClick={() => setOpenEditDialog(true)} title={'Edit'}/>
        <Dialog
          title={'Edit task information'}
          isOpen={openEditDialog}
          onClose={dialogCloseHandler}
        >
          <TaskForm config={updateTaskFormConfig} onAction={onEditFormAction} task={currentTask}/>
        </Dialog>
      </Card>
    </div>
  )
}