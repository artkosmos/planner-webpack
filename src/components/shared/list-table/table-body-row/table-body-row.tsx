import { type ComponentPropsWithoutRef, MouseEvent } from 'react';

import clsx from 'clsx';
import dayjs from 'dayjs';

import { DeleteIcon } from '@/assets/icons/delete-icon';
import type { ITask } from '@/common/types';

type Props = {
  task: ITask;
  deleteRow: (id: string) => void;
} & ComponentPropsWithoutRef<'tr'>;

export const TableBodyRow = ({ task, deleteRow, ...rest }: Props) => {
  const deleteRowHandler = (event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    deleteRow(task.id);
  };

  const classNames = {
    delete: clsx('table-delete-icon', 'table-delete-icon_dark'),
  };

  return (
    <tr key={task.id} {...rest}>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td>{dayjs(task.date).format('DD.MM.YYYY hh:mm:ss a')}</td>
      <td>
        <DeleteIcon className={classNames.delete} onClick={deleteRowHandler} />
      </td>
    </tr>
  );
};
