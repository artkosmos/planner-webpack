import React, {useState} from 'react';
import {ButtonPrimary, Card, Dialog, InfoTitle} from "@/components/shared";
import {useParams} from "react-router-dom";
import './style.scss'
import clsx from "clsx";
import {type AppDispatch, useAppSelector} from "@/store";
import {EditFormButtons, EditTaskForm, type IEditTaskAction} from "./edit-task-form";
import {useDispatch} from "react-redux";
import {updateTask} from "@/api";
import dayjs from "dayjs";

type Props = {
  className?: string
}

export const TaskCard = ({className}: Props) => {
  const {id} = useParams<string>()
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const task = useAppSelector(state => state.main.list.find(task => task.id === id));

  const classNames = clsx(className, 'task-card')

  if (!task) {
    return <InfoTitle title={'Specified card is not found'}/>
  }

  const onEditFormAction = ({name, model}: IEditTaskAction) => {
   switch (name) {
     case EditFormButtons.CANCEL:
       setOpenEditDialog(false)
       break;
     case EditFormButtons.SAVE:
      const {title, date} = model
       dispatch(updateTask({id, date, title}))
       setOpenEditDialog(false)
       break;
   }
  }
  const dialogCloseHandler = () => {
    setOpenEditDialog(false)
  }


  return (
    <div className={classNames}>
      <Card>
        <p className={'task-card__title'}>GENERAL INFORMATION</p>
        <ul className={'task-card__list'}>
          <li><span className={'task-card__point'}>Name: </span>{task.title}</li>
          <li><span className={'task-card__point'}>ID: </span>{task.id}</li>
          <li><span className={'task-card__point'}>Date: </span>{dayjs(JSON.parse(task.date)).format('DD.MM.YYYY hh:mm:ss')}</li>
        </ul>
        <ButtonPrimary className={'task-card__edit-button'} onClick={() => setOpenEditDialog(true)} title={'Edit'}/>
        <Dialog
          title={'Edit task information'}
          isOpen={openEditDialog}
          onClose={dialogCloseHandler}
        >
          <EditTaskForm onAction={onEditFormAction} task={task}/>
        </Dialog>
      </Card>
    </div>
  )
}