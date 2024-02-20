import React, {type ComponentPropsWithoutRef, MouseEvent} from 'react';
import {DeleteIcon} from "@/assets/icons";
import type {ITask} from "@/common";
import dayjs from "dayjs";

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
      <td>{dayjs(JSON.parse(task.date)).format('DD.MM.YYYY hh:mm:ss')}</td>
      <td>
        <DeleteIcon className={'table-delete-icon'} onClick={deleteRowHandler}/>
      </td>
    </tr>
  );
};