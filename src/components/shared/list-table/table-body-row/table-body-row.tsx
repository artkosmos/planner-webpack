import React, {type ComponentPropsWithoutRef, MouseEvent} from 'react';
import {DeleteIcon} from "@/assets/icons";
import type {ITask} from "@/common";

type Props = {
  task: ITask
  deleteRow: (id: string) => void
} & ComponentPropsWithoutRef<'tr'>

export const TableBodyRow = ({task, deleteRow, ...rest}: Props) => {

  const deleteRowHandler = (event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation()
    deleteRow(task.id)
  }

  return (
    <tr key={task.id} {...rest}>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td>{task.date}</td>
      <td>
        <DeleteIcon className={'table-delete-icon'} onClick={deleteRowHandler}/>
      </td>
    </tr>
  );
};