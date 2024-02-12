import './style.scss'
import {IList} from "../../../common";
import clsx from "clsx";
import {DeleteIcon} from "../delete-icon/delete-icon";
import {useMemo} from "react";

type Props = {
  list: IList[]
  className?: string
  deleteList?: (id: string) => void
}

export const ListTable = ({list, deleteList, className}: Props) => {
  const mappedLists = useMemo(() => {
    return list.map((task) => {
      return <tr key={task.id}>
        <td>{task.id}</td>
        <td>{task.title}</td>
        <td>{task.date}</td>
        <td>
          <DeleteIcon className={'table-delete-icon'} onClick={() => deleteList(task.id)}/>
        </td>
      </tr>
    })
  }, [list])

  const classNames = clsx('table-container', className)

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
        <tbody>
        {mappedLists}
        </tbody>
      </table>
    </div>
  );
}
