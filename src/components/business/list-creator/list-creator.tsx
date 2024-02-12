import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import moment from "moment/moment";
import {v4 as uuid} from "uuid";
import {createList, deleteList} from '@/api';
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
    const date = moment().format('MMMM Do YYYY, h:mm:ss')
    const id = uuid().slice(0, 8)
    dispatch(createList({title: inputValue, date, id}))
    setInputValue('')
  }

  const deleteListHandler = (id: string) => {
    dispatch(deleteList({id}))
  }

  return (
    <div className={'list-creator-content'}>
      <div className={'add-list-block'}>
        <FilledInput onKeyDown={handleEnterPress} value={inputValue} onChange={inputValueHandler}/>
        <ButtonPrimary title={'Add list'} onClick={createListHandler} disabled={!inputValue}/>
      </div>
      {list.length
        ? <ListTable list={list} deleteTask={deleteListHandler}/>
        : <InfoTitle title={'No available data'}/>}
    </div>
  );
};
