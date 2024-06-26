import { useMemo } from 'react';

import clsx from 'clsx';

import { ITask } from '@/common/types';
import { TableBodyRow } from '@/components/shared/list-table';

import './style.scss';

type Props = {
  list: ITask[];
  className?: string;
  deleteTask?: (id: string) => void;
  onRowClick?: (id: string) => void;
  dateFormat?: string;
};

export const ListTable = ({
  list,
  deleteTask,
  className,
  onRowClick,
  dateFormat,
}: Props) => {
  const taskList = useMemo(() => {
    return list.map(task => {
      return (
        <TableBodyRow
          data-testid={`table-row-${task.id}`}
          data-status={task.status}
          onClick={() => onRowClick(task.id)}
          key={task.id}
          task={task}
          deleteRow={deleteTask}
          dateFormat={dateFormat}
        />
      );
    });
  }, [list, dateFormat]);

  const classNames = useMemo(() => {
    return {
      container: clsx('table-container', className),
      table: clsx('table', 'table_dark'),
      col1: 'col col-1',
      col2: 'col col-2',
      col3: 'col col-3',
      col4: 'col col-4',
      col5: 'col col-5',
      tableList: 'table-list',
    };
  }, []);

  return (
    <div className={classNames.container}>
      <ul className={classNames.table}>
        <div className={classNames.tableList}>{taskList}</div>
      </ul>
    </div>
  );
};
