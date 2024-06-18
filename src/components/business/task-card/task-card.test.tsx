import * as router from 'react-router-dom';
import { toast } from 'react-toastify';
import { act, fireEvent, waitFor, within } from '@testing-library/react';

import { renderWithProviders } from '@/__mocks__/redux-jest-helper';
import { mockedTaskList } from '@/__mocks__/task-list';
import taskService from '@/api';
import { ITask } from '@/common/types';
import { TaskCard } from '@/components/business/task-card';

import '@testing-library/jest-dom';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}));

describe('testing of task-card component', () => {
  const localStorageGetItem = jest.spyOn(Storage.prototype, 'getItem');
  const mockedUseParams = jest.spyOn(router, 'useParams');
  const mockedGetTask = jest.spyOn(taskService, 'getTask');
  localStorageGetItem.mockReturnValue(JSON.stringify(mockedTaskList));
  mockedUseParams.mockReturnValue({ id: mockedTaskList[3].id });

  test('should display loader while fetching task data', () => {
    const { getByTestId } = renderWithProviders(<TaskCard />);

    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });

  test('should render card with its title and task details', async () => {
    const { findByTestId, getByText } = renderWithProviders(<TaskCard />);

    const card = await findByTestId('card');
    const cardTitle = getByText(/general information/i);
    const editButton = getByText('Edit');
    const taskImage = within(card).getByRole('img') as HTMLImageElement;

    expect(card).toContainElement(cardTitle);
    expect(card).toContainElement(editButton);
    expect(card).toContainElement(taskImage);
    expect(taskImage.alt).toBe('task image');
    expect(card).toHaveTextContent('meeting');
    expect(card).toHaveTextContent('72e14782');
    expect(card).toHaveTextContent('02/04/2018 03:06 PM');
  });

  test('should appear image pop up', async () => {
    const { findByTestId } = renderWithProviders(<TaskCard />);

    const card = await findByTestId('card');
    const taskImage = within(card).getByRole('img') as HTMLImageElement;

    expect(taskImage.alt).toBe('task image');

    fireEvent.click(taskImage);
    const imagePopUp = await findByTestId('dialog');
    const nestedImage = within(imagePopUp).getByRole('img') as HTMLImageElement;

    expect(imagePopUp).toContainElement(nestedImage);
  });

  test('should display a star icon if task marked as important', async () => {
    const { findByTestId } = renderWithProviders(<TaskCard />);

    const card = await findByTestId('card');
    const starIcon = within(card).getByTestId('star-icon');

    expect(card).toContainElement(starIcon);
  });

  test('displays the correct status for done tasks', async () => {
    mockedGetTask.mockResolvedValueOnce(mockedTaskList[3]);
    const { findByTestId } = renderWithProviders(<TaskCard />);

    const card = await findByTestId('card');
    const status = within(card).getByText('Task is done');

    expect(card).toContainElement(status);
  });

  test('displays the correct status for expired tasks', async () => {
    mockedGetTask.mockResolvedValueOnce(mockedTaskList[4]);
    const { findByText } = renderWithProviders(<TaskCard />);

    const status = await findByText('Task was expired');

    expect(status).toBeInTheDocument();
  });

  test('displays the correct status for today tasks', async () => {
    mockedGetTask.mockResolvedValueOnce(mockedTaskList[2]);
    const { findByText } = renderWithProviders(<TaskCard />);

    const status = await findByText('Task expires today');

    expect(status).toBeInTheDocument();
  });

  test('displays the correct status for wrong status', async () => {
    mockedGetTask.mockResolvedValueOnce(mockedTaskList[1]);
    const { findByText } = renderWithProviders(<TaskCard />);

    const status = await findByText('Status is unknown');

    expect(status).toBeInTheDocument();
  });

  test('displays the correct status for actual tasks', async () => {
    mockedGetTask.mockResolvedValueOnce(mockedTaskList[0]);
    const { findByText } = renderWithProviders(<TaskCard />);

    const status = await findByText('Task is actual');

    expect(status).toBeInTheDocument();
  });

  test('should update information of current task', async () => {
    const updatedTask: ITask = {
      id: '72e14782',
      title: 'important date',
      date: '2023-12-20T19:30',
      image: null,
      important: false,
      isDone: false,
    };

    const updatedTaskList = mockedTaskList.map(task =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
    );

    localStorageGetItem
      .mockReturnValueOnce(JSON.stringify(mockedTaskList))
      .mockReturnValueOnce(JSON.stringify(mockedTaskList))
      .mockReturnValueOnce(JSON.stringify(updatedTaskList));

    const { findByTestId, getByTestId, getByText, getByRole, getByLabelText } =
      renderWithProviders(<TaskCard />);

    const card = await findByTestId('card');
    const starIcon = within(card).queryByTestId('star-icon');
    const status = within(card).getByText('Task is done');
    const editButton = within(card).getByText('Edit');
    fireEvent.click(editButton);
    const dialog = getByTestId('dialog');
    const dialogTitle = getByText('Edit task information');
    const form = getByRole('form');
    const nameField = getByLabelText('Name');
    const dateFieldButton = getByTestId('datepicker-button');
    const isDoneField = getByLabelText('Completed');
    const isImportantField = getByLabelText('Mark as important');
    const confirmButton = within(form).getByText('Edit');

    expect(card).toContainElement(starIcon);
    expect(card).toContainElement(status);
    expect(dialog).toContainElement(dialogTitle);
    expect(dialog).toContainElement(form);
    expect(nameField).toHaveValue('meeting');
    expect(dateFieldButton).toHaveTextContent('02/04/2018 03:06 PM');
    expect(isImportantField).toBeChecked();
    expect(isDoneField).toBeChecked();

    fireEvent.change(nameField, { target: { value: updatedTask.title } });
    fireEvent.change(dateFieldButton, {
      target: { value: updatedTask.date },
    });
    fireEvent.click(isDoneField);
    fireEvent.click(isImportantField);
    await act(() => fireEvent.click(confirmButton));
    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
    await waitFor(() => expect(loader).not.toBeInTheDocument(), {
      timeout: 1200,
    });

    const updatedCard = await findByTestId('card');
    const updatedStatus = within(updatedCard).getByText('Task was expired');

    expect(updatedCard).toHaveTextContent('12/20/2023 07:30 PM');
    expect(updatedCard).toHaveTextContent('72e14782');
    expect(updatedCard).toContainElement(updatedStatus);
    expect(updatedCard).not.toContainElement(starIcon);
    expect(isImportantField).not.toBeChecked();
    expect(isDoneField).not.toBeChecked();
    expect(toast.success).toHaveBeenCalledWith('Task updated successfully');
  });

  test('dialog should be closed if a cancel button was clicked', async () => {
    const { findByTestId, getByText, getByTestId } = renderWithProviders(
      <TaskCard />,
    );

    const card = await findByTestId('card');
    const editButton = getByText('Edit');

    expect(card).toContainElement(editButton);

    fireEvent.click(editButton);
    const dialog = getByTestId('dialog');
    const cancelButton = getByText('Cancel');

    expect(dialog).toContainElement(cancelButton);

    fireEvent.click(cancelButton);

    await waitFor(() => expect(dialog).not.toBeInTheDocument());
  });

  test("should appears an error if update task wasn't successful", async () => {
    jest
      .spyOn(taskService, 'updateTask')
      .mockRejectedValueOnce(new Error("Specified task wasn't found"));

    const { findByText, getByRole, findByTestId } = renderWithProviders(
      <TaskCard />,
    );

    const editCardButton = await findByText('Edit');
    fireEvent.click(editCardButton);
    const form = getByRole('form');
    const isDoneField = within(form).getByLabelText('Completed');
    const confirmButton = within(form).getByText('Edit');
    fireEvent.click(isDoneField);
    fireEvent.click(confirmButton);
    const error = await findByTestId('info-title');

    expect(error).toHaveTextContent("Specified task wasn't found");
    expect(toast.error).toHaveBeenCalledWith(
      'An error occurred while updating',
    );
  });

  test("should appear message if a task wasn't found due to wrong id", async () => {
    mockedUseParams.mockReturnValueOnce({ id: 'wrong id' });

    const { queryByTestId, findByTestId } = renderWithProviders(<TaskCard />);

    const infoMessage = await findByTestId('info-title');
    const card = queryByTestId('card');

    expect(card).not.toBeInTheDocument();
    expect(infoMessage).toHaveTextContent("Specified task wasn't found");
  });
});
