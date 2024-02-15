import React, {useState} from 'react';
import {ButtonPrimary, Card, Dialog, InfoTitle} from "@/components/shared";
import {useParams} from "react-router-dom";
import './style.scss'
import clsx from "clsx";
import {type AppDispatch, useAppSelector} from "@/store";
import {EditFormButtons, EditTaskForm} from "./edit-task-form";
import {useDispatch} from "react-redux";
import {updateTask} from "@/api";
import type {ITask} from "@/common";

export interface IEditTaskAction {
  model?: ITask
  name: EditFormButtons
}

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
       break
     case EditFormButtons.SAVE:
      const {title, date} = model
       dispatch(updateTask({id, date, title}))
       setOpenEditDialog(false)
       break
   }
  }

  return (
    <div className={classNames}>
      <Card>
        <p className={'task-card__title'}>General information</p>
        <ul className={'task-card__list'}>
          <li><span className={'task-card__point'}>Name: </span>{task.title}</li>
          <li><span className={'task-card__point'}>ID: </span>{task.id}</li>
          <li><span className={'task-card__point'}>Created at: </span>{task.date}</li>
        </ul>
        <ButtonPrimary className={'task-card__edit-button'} onClick={() => setOpenEditDialog(true)} title={'Edit'}/>
        <Dialog
          setIsOpen={setOpenEditDialog}
          title={'Edit task information'}
          isOpen={openEditDialog}
        >
          <EditTaskForm onAction={onEditFormAction} task={task}/>
        </Dialog>
      </Card>
    </div>
  )
}