import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// import clsx from 'clsx';
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
  // className,
  onRowClick,
  dateFormat,
}: Props) => {
  const { t } = useTranslation('home');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const taskList = useMemo(() => {
    return list.map(task => {
      return (
        <TableBodyRow
          data-testid={`table-row-${task.id}`}
          onClick={() => onRowClick(task.id)}
          key={task.id}
          task={task}
          deleteRow={deleteTask}
          isMobile={isMobile}
          dateFormat={dateFormat}
        />
      );
    });
  }, [list, dateFormat]);

  // const classNames = {
  //   container: clsx('table-container', className),
  //   table: clsx('list-table', 'list-table_dark'),
  // };

  return (
    <div className="table-container">
      <ul className="table">
        <li className="table-header">
          <div className="col col-1">{t('table_column_1')}</div>
          <div className="col col-2">{t('table_column_2')}</div>
          <div className="col col-3">{t('table_column_3')}</div>
          <div className="col col-4"></div>
          <div className="col col-5"></div>
        </li>
        <div className={'table-list'}>{taskList}</div>
      </ul>
    </div>
  );
};
