import { useNavigate } from 'react-router-dom';

import { TaskCard } from '@/components/business/task-card';
import { BackButton } from '@/components/shared/back-button';
import { HOME } from '@/routes';

import './style.scss';

const TaskDescription = () => {
  const navigate = useNavigate();

  return (
    <div className={'container'}>
      <div className={'task-description'}>
        <BackButton
          onClick={() => navigate(HOME)}
          title={'To home'}
          className={'task-description__back-button'}
        />
        <TaskCard />
      </div>
    </div>
  );
};

export default TaskDescription;
