import React from 'react';
import {TaskCard} from "@/components/business";
import {BackButton} from "@/components/shared";
import {useNavigate} from "react-router-dom";
import './style.scss'
import {HOME} from "@/routes";

const TaskDescription = () => {
  const navigate = useNavigate()

  return (
    <div className={'container'}>
      <div className={'task-description'}>
        <BackButton
          onClick={() => navigate(HOME)}
          title={'To home'}
          className={'task-description__back-button'}/>
        <TaskCard/>
      </div>
    </div>
  );
};

export default TaskDescription