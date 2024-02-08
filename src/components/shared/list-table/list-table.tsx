import './style.scss'
import {IList} from "../../../common";
import clsx from "clsx";
import {DeleteIcon} from "../delete-icon/delete-icon";

type Props = {
  lists: IList[]
  className?: string
  deleteList?: (id: string) => void
}

export const ListTable = ({lists, deleteList, className}: Props) => {
  const mappedLists = lists.map((list) => {
    return <tr key={list.id}>
      <td>{list.id}</td>
      <td>{list.title}</td>
      <td>{list.date}</td>
      <td>
        <DeleteIcon className={'table-delete-icon'} onClick={() => deleteList(list.id)}/>
      </td>
    </tr>
  })

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
