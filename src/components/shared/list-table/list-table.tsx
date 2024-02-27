import './style.scss';
import { ITask } from '@/common';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableBodyRow } from '@/components/shared/list-table/table-body-row';
import { TASK } from '@/routes';

type Props = {
  list: ITask[];
  className?: string;
  deleteTask?: (id: string) => void;
};

export const ListTable = ({ list, deleteTask, className }: Props) => {
  const navigate = useNavigate();

  const taskList = useMemo(() => {
    return list.map(task => {
      return (
        <TableBodyRow
          onClick={() => navigate(`${TASK}/${task.id}`)}
          key={task.id}
          task={task}
          deleteRow={deleteTask}
        />
      );
    });
  }, [list]);

  const classNames = clsx('table-container', className);

  return (
    <div className={classNames}>
      <table className={'list-table'} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{taskList}</tbody>
      </table>
    </div>
  );
};
