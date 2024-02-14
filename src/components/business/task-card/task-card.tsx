import React from 'react';
import {Card, InfoTitle} from "@/components/shared";
import {useParams} from "react-router-dom";
import './style.scss'
import clsx from "clsx";
import {useAppSelector} from "@/store";
import {loremIpsum} from "lorem-ipsum";

type Props = {
  className?: string

}

export const TaskCard = ({className}: Props) => {
  const {id} = useParams<string>()
  const loremText = loremIpsum({count: 5})

  const task = useAppSelector(state => state.main.list.find(task => task.id === id));

  const classNames = clsx(className, 'task-card')

  if (!task) {
    return <InfoTitle title={'Specified card is not found'}/>
  }

  return (
    <div className={classNames}>
      <Card>
        <p className={'task-card__title'}>General information</p>
        <ul className={'task-card__list'}>
          <li><span className={'task-card__point'}>Name: </span>{task.title}</li>
          <li><span className={'task-card__point'}>ID: </span>{task.id}</li>
          <li><span className={'task-card__point'}>Created at: </span>{task.date}</li>
          <li><span className={'task-card__point'}>Description: </span>{loremText}</li>
        </ul>
      </Card>
    </div>
  )
}