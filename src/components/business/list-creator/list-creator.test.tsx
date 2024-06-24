import { toast } from 'react-toastify';
import { act, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import dayjs from 'dayjs';

import { renderWithRedux } from '@/__mocks__/redux-jest';
import { mockedTaskList } from '@/__mocks__/task-list';
import taskService from '@/api';
import { ITask } from '@/common/types';
import { ListCreator } from '@/components/business/list-creator';

import '@testing-library/jest-dom';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('nanoid', () => {
  return { nanoid: () => '123' };
});

describe('testing of list creator component', () => {
  const mockedGetTaskList = jest.spyOn(taskService, 'getTaskList');

  afterEach(() => {
    mockedGetTaskList.mockClear();
  });

  test('should appear info title if list is empty', async () => {
    mockedGetTaskList.mockResolvedValueOnce([]);

    const { queryByRole, findByTestId } = renderWithRedux(<ListCreator />);

    const infoTitle = await findByTestId('info-title');
    const table = queryByRole('table');

    expect(infoTitle).toHaveTextContent('No available data');
    expect(table).not.toBeInTheDocument();
  });

  test('should appear table with tasks if list is not empty', async () => {
    mockedGetTaskList.mockResolvedValueOnce(mockedTaskList);

    const { findAllByTestId, queryByTestId } = renderWithRedux(<ListCreator />);

    const tasks = await findAllByTestId(/table-row-/);
    const info = queryByTestId('info-title');

    expect(info).not.toBeInTheDocument();
    expect(tasks).toHaveLength(mockedTaskList.length);
  });

  test('displays add button and loader during init fetch, then search input and tasks', async () => {
    mockedGetTaskList.mockResolvedValueOnce(mockedTaskList);

    const { findAllByTestId, getByTestId, findByLabelText } = renderWithRedux(
      <ListCreator />,
    );

    const addButton = getByTestId('primary-button');
    const loader = getByTestId('loader');

    expect(addButton).toHaveTextContent('Add task');
    expect(loader).toBeInTheDocument();

    const searchInput = await findByLabelText('Search');
    const tasks = await findAllByTestId(/table-row-/);

    expect(tasks).toHaveLength(mockedTaskList.length);
    expect(loader).not.toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  test('task should be created and added in a table', async () => {
    const mockedCreateTask = jest.spyOn(taskService, 'createTask');

    const newTask: ITask = {
      id: '123',
      title: 'new task',
      date: '2022-01-15T10:15',
      image: null,
      important: true,
      isDone: false,
    };

    mockedCreateTask.mockResolvedValueOnce('Task was created successfully');

    mockedGetTaskList
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([newTask]);

    const {
      getByRole,
      getByTestId,
      getByLabelText,
      getByText,
      findByTestId,
      findByText,
    } = renderWithRedux(<ListCreator />);

    const addButton = getByText('Add task');
    const noDataTitle = await findByText('No available data');

    expect(addButton).toBeInTheDocument();
    expect(noDataTitle).toBeInTheDocument();

    await act(() => fireEvent.click(addButton));
    const dialog = getByTestId('dialog');
    const nameInput = getByLabelText('Task name');
    const dateFieldButton = getByRole('button', { name: 'Pick date and time' });
    const importantField = getByLabelText('Mark as important');
    const form = getByRole('form');
    const confirmButton = getByRole('button', { name: 'Add' });

    expect(dialog).toHaveTextContent('Create task');
    expect(form).toContainElement(confirmButton);
    expect(confirmButton).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: newTask.title } });
    await act(() => fireEvent.click(dateFieldButton));
    const yearSelector = document.querySelector(
      '.MuiPickersCalendarHeader-label',
    ) as HTMLElement;
    fireEvent.click(yearSelector);
    const yearList = document.querySelector(
      '.MuiYearCalendar-root',
    ) as HTMLElement;
    const yearToChoose = within(yearList).getByText('2022');
    fireEvent.click(yearToChoose);
    const monthList = document.querySelector(
      '.MuiMonthCalendar-root',
    ) as HTMLElement;
    const monthToChoose = within(monthList).getByText('Jan');
    fireEvent.click(monthToChoose);
    const dayList = document.querySelector(
      '.MuiDayCalendar-root',
    ) as HTMLElement;
    const dayToChoose = within(dayList).getByText('15');
    fireEvent.click(dayToChoose);
    const hoursList = document.querySelector(
      '[aria-label="Select hours"]',
    ) as HTMLElement;
    const hourToChoose = within(hoursList).getByText('10');
    fireEvent.click(hourToChoose);
    const minutesList = document.querySelector(
      '[aria-label="Select minutes"]',
    ) as HTMLElement;
    const minutesToChoose = within(minutesList).getByText('15');
    fireEvent.click(minutesToChoose);
    const ampmList = document.querySelector('[aria-label="AM"]') as HTMLElement;
    const ampmToChoose = within(ampmList).getByText('AM');
    fireEvent.click(ampmToChoose);
    const pickerOkButton = getByRole('button', { name: 'OK' });
    fireEvent.click(pickerOkButton);
    fireEvent.click(importantField);

    await act(() => fireEvent.click(confirmButton));

    expect(mockedCreateTask).toHaveBeenCalledWith({
      date: dayjs(newTask.date).toDate(),
      id: '123',
      image: null,
      important: true,
      isDone: false,
      status: undefined,
      title: 'new task',
    });

    const row = await findByTestId(/table-row-/);
    const importantIcon = within(row).getByTestId('star-icon');

    expect(row).toHaveTextContent('new task');
    expect(row).toHaveTextContent('01/15/2022 10:15 AM');
    expect(row).toContainElement(importantIcon);
    expect(noDataTitle).not.toBeInTheDocument();
    expect(toast.success).toHaveBeenCalledWith('Task created successfully');
  });

  test('task should be removed from a table when icon is clicked', async () => {
    const mockedDeleteTask = jest.spyOn(taskService, 'deleteTask');
    mockedDeleteTask.mockResolvedValueOnce('Task was deleted successfully');
    mockedGetTaskList
      .mockResolvedValueOnce(mockedTaskList)
      .mockResolvedValueOnce(mockedTaskList.slice(1));

    const { findAllByTestId } = renderWithRedux(<ListCreator />);

    const tasks = await findAllByTestId(/table-row-/);

    expect(tasks).toHaveLength(mockedTaskList.length);

    const taskToDelete = tasks[0];
    const taskName = within(taskToDelete).getByText('go camping');
    const deleteIcon = within(taskToDelete).getByTestId('delete-icon');

    await act(() => fireEvent.click(deleteIcon));
    expect(mockedDeleteTask).toHaveBeenCalledWith('85df17d5');

    const updatedTasks = await findAllByTestId(/table-row-/);

    expect(updatedTasks).toHaveLength(mockedTaskList.length - 1);
    expect(taskName).not.toBeInTheDocument();
    expect(toast.success).toHaveBeenCalledWith('Task deleted successfully');
  });

  test("should appear an error if deleting of task wasn't successful", async () => {
    const mockedDeleteTask = jest.spyOn(taskService, 'deleteTask');
    mockedDeleteTask.mockRejectedValueOnce(
      new Error("Specified task wasn't found"),
    );

    mockedGetTaskList.mockResolvedValueOnce(mockedTaskList);

    const { findByTestId, queryByTestId } = renderWithRedux(<ListCreator />);

    const taskToDelete = await findByTestId(
      `table-row-${mockedTaskList[0].id}`,
    );
    const deleteIcon = within(taskToDelete).getByTestId('delete-icon');
    await act(() => fireEvent.click(deleteIcon));
    const error = await findByTestId('info-title');

    expect(error).toHaveTextContent("Specified task wasn't found");
    expect(queryByTestId('loader')).not.toBeInTheDocument();
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        'An error occurred while deleting',
      ),
    );
  });

  test('should trigger navigate if task row is clicked', async () => {
    mockedGetTaskList.mockResolvedValueOnce(mockedTaskList);

    const { findAllByTestId } = renderWithRedux(<ListCreator />);

    const tasks = await findAllByTestId(/table-row/);
    const taskToClick = tasks[2];
    fireEvent.click(taskToClick);

    expect(mockedNavigate).toHaveBeenCalledWith('/task/151deb35');
  });

  test('search by name should work correctly', async () => {
    mockedGetTaskList
      .mockResolvedValueOnce(mockedTaskList)
      .mockResolvedValueOnce([mockedTaskList[1]]);

    const { findAllByTestId, findByLabelText, getByTestId } = renderWithRedux(
      <ListCreator />,
    );

    const searchInput = await findByLabelText('Search');
    const tasks = await findAllByTestId(/table-row/);
    await userEvent.type(searchInput, mockedTaskList[1].title);

    await waitFor(() => {
      expect(mockedGetTaskList).toHaveBeenCalledWith({
        filterBy: '',
        search: 'cinema',
        sortBy: '',
      });
      expect(getByTestId('loader')).toBeInTheDocument();
    });

    const updatedTasks = await findAllByTestId(/table-row/);
    expect(updatedTasks).toHaveLength(1);
    expect(tasks[1]).toHaveTextContent('cinema');
  });

  test('dialog should be closed if a cancel button was clicked', async () => {
    const { getByTestId, getByText } = renderWithRedux(<ListCreator />);

    const addButton = getByText('Add task');
    await act(() => fireEvent.click(addButton));
    const dialog = getByTestId('dialog');
    const cancelButton = getByText('Cancel');
    await act(() => fireEvent.click(cancelButton));

    await waitFor(() => expect(dialog).not.toBeInTheDocument());
  });
});
