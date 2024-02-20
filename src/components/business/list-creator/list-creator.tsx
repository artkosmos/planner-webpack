import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {v4 as uuid} from "uuid";
import {createTask, deleteTask} from '@/api';
import {ButtonPrimary, FilledInput, InfoTitle, ListTable} from "@/components/shared";
import './style.scss'
import {useAppSelector} from "@/store";

export const ListCreator = () => {
  const [inputValue, setInputValue] = useState<string>('')

  const list = useAppSelector((state) => state.main.list)
  const dispatch = useDispatch<AppDispatch>()

  const inputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    setInputValue(value)
  }

  const handleEnterPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (inputValue) {
      if (event.key === 'Enter') {
        createListHandler();
      }
    }
  };

  const createListHandler = () => {
    const date = new Date().toISOString()
    const id = uuid().slice(0, 8)
    dispatch(createTask({title: inputValue, date, id}))
    setInputValue('')
  }

  const deleteListHandler = (id: string) => {
    dispatch(deleteTask({id}))
  }

  return (
    <div className={'list-creator'}>
      <div className={'list-creator__add-task-block add-task-block'}>
        <FilledInput
          className={'add-task-block__input'}
          onKeyDown={handleEnterPress}
          label={'Write task name'}
          value={inputValue}
          onChange={inputValueHandler}/>
        <ButtonPrimary
          className={'add-task-block__button'}
          title={'Add list'}
          onClick={createListHandler}
          disabled={!inputValue}/>
      </div>
      {list.length
        ? <ListTable list={list} deleteTask={deleteListHandler}/>
        : <InfoTitle title={'No available data'}/>}
    </div>
  );
};
