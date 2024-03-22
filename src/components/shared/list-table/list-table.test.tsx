import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

import { ITask } from '@/common/types';

import { ListTable } from './list-table';

import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('testing of table component', () => {
  const list: ITask[] = [
    { id: '1', title: 'Task 1', date: new Date().toString() },
    { id: '2', title: 'Task 2', date: new Date().toString() },
  ];

  const renderWithRouter = (component: ReactNode) =>
    render(<MemoryRouter>{component}</MemoryRouter>);

  test('should render with tasks in list', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <ListTable list={list} />,
    );

    const table = getByRole('table');
    const row1 = getByTestId('table-row-1');
    const row2 = getByTestId('table-row-2');

    expect(table).toContainElement(row1);
    expect(table).toContainElement(row2);
  });

  test('should render with an empty task list', () => {
    const { getByRole, queryAllByTestId } = renderWithRouter(
      <ListTable list={[]} />,
    );

    const table = getByRole('table');
    const rows = queryAllByTestId(/table-row-/);

    expect(table).toBeInTheDocument();
    expect(rows.length).toBe(0);
  });

  test('should trigger navigate when a row is clicked', () => {
    const { getByTestId } = renderWithRouter(<ListTable list={list} />);

    const row = getByTestId('table-row-2');

    fireEvent.click(row);

    expect(mockedNavigate).toHaveBeenCalled();
  });

  test('should execute callback when a delete icon is clicked', () => {
    const deleteTask = jest.fn();
    const { getByTestId } = renderWithRouter(
      <ListTable list={list} deleteTask={deleteTask} />,
    );

    const row = getByTestId('table-row-2');
    const deleteIcon = row.querySelector('svg');

    fireEvent.click(deleteIcon);

    expect(deleteTask).toHaveBeenCalledWith('2');
  });
});
