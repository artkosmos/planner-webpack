import { type ComponentPropsWithoutRef, MouseEvent } from 'react';

import dayjs from 'dayjs';

import { DeleteIcon } from '@/assets/icons/delete-icon';
import { StarIcon } from '@/assets/icons/star-icon';
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

  return (
    <tr key={task.id} {...rest}>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td>{dayjs(task.date).format('DD.MM.YYYY hh:mm:ss a')}</td>
      <td>{task.important && <StarIcon className={'table-star-icon'} />}</td>
      <td>
        <DeleteIcon
          className={'table-delete-icon'}
          onClick={deleteRowHandler}
        />
      </td>
    </tr>
  );
};
