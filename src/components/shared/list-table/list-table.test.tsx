import { fireEvent, render, within } from '@testing-library/react';

import { ITask, TaskStatus } from '@/common/types';

import { ListTable } from './list-table';

import '@testing-library/jest-dom';

describe('testing of table component', () => {
  const list: ITask[] = [
    {
      id: '1',
      title: 'Task 1',
      date: '2023-06-12T08:00:00.000Z',
      image: null,
      isDone: true,
      important: true,
      status: TaskStatus.DONE,
    },
    {
      id: '2',
      title: 'Task 2',
      date: '2024-12-25T15:30:00.000Z',
      isDone: false,
      important: false,
      status: TaskStatus.ACTUAL,
      image: null,
    },
  ];

  test('should render with tasks in list', () => {
    const { getByTestId, queryAllByTestId } = render(<ListTable list={list} />);

    const row1 = getByTestId(`table-row-${list[0].id}`);
    const row2 = getByTestId(`table-row-${list[1].id}`);
    const rows = queryAllByTestId(/table-row-/);

    expect(row1).toBeInTheDocument();
    expect(row2).toBeInTheDocument();
    expect(rows.length).toBe(list.length);
  });

  test('should render with an empty task list', () => {
    const { queryAllByTestId } = render(<ListTable list={[]} />);

    const rows = queryAllByTestId(/table-row-/);

    expect(rows.length).toBe(0);
  });

  test('should trigger callback when a row is clicked', () => {
    const onRowClick = jest.fn();

    const { getByTestId } = render(
      <ListTable list={list} onRowClick={onRowClick} />,
    );

    const row = getByTestId(`table-row-${list[1].id}`);

    fireEvent.click(row);

    expect(onRowClick).toHaveBeenCalledWith(list[1].id);
  });

  test('should execute callback when a delete icon is clicked', () => {
    const deleteTask = jest.fn();
    const { getByTestId } = render(
      <ListTable list={list} deleteTask={deleteTask} />,
    );

    const row = getByTestId(`table-row-${list[1].id}`);
    const deleteIcon = row.querySelector('svg');

    fireEvent.click(deleteIcon);

    expect(deleteTask).toHaveBeenCalledWith(list[1].id);
  });

  test('should render with star icon if marked as important', () => {
    const { getByTestId } = render(<ListTable list={list} />);

    const row = getByTestId(`table-row-${list[0].id}`);
    const starIcon = within(row).queryByTestId('star-icon');

    expect(row).toContainElement(starIcon);
  });
});
