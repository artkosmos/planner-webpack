import * as router from 'react-router-dom';
import { act, fireEvent, waitFor, within } from '@testing-library/react';

import { mockedTaskList, renderWithProviders } from '@/__mocks__';
import taskService from '@/api';
import { TaskCard } from '@/components/business/task-card';

import '@testing-library/jest-dom';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}));

describe('testing of task-card component', () => {
  const localStorageGetItem = jest.spyOn(Storage.prototype, 'getItem');
  const mockedUseParams = jest.spyOn(router, 'useParams');
  localStorageGetItem.mockReturnValue(JSON.stringify(mockedTaskList));
  mockedUseParams.mockReturnValue({ id: mockedTaskList[3].id });

  test('should display loader while fetching task data', () => {
    const { getByTestId } = renderWithProviders(<TaskCard />);

    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });

  test('should render card with title and task details', async () => {
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
    expect(card).toHaveTextContent('04.02.2018 03:06:46 pm');
  });

  test("should appear message if a task wasn't found due to wrong id", async () => {
    mockedUseParams.mockReturnValueOnce({ id: 'wrong id' });

    const { queryByTestId, findByTestId } = renderWithProviders(<TaskCard />);

    const infoMessage = await findByTestId('info-title');
    const card = queryByTestId('card');

    expect(card).not.toBeInTheDocument();
    expect(infoMessage).toHaveTextContent("Specified task wasn't found");
  });

  test('should update information of current task', async () => {
    const updatedTask = {
      id: '72e14782',
      title: 'important date',
      date: '2023-12-20T19:30:15',
      image: 'map.png',
      important: false,
    };

    const updatedTaskList = mockedTaskList.map(task =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
    );

    localStorageGetItem
      .mockReturnValueOnce(JSON.stringify(mockedTaskList))
      .mockReturnValueOnce(JSON.stringify(mockedTaskList))
      .mockReturnValueOnce(JSON.stringify(updatedTaskList));

    const { findByTestId, getByText, getByTestId, getByRole, getByLabelText } =
      renderWithProviders(<TaskCard />);

    const card = await findByTestId('card');
    const editButton = getByText('Edit');

    expect(card).toBeInTheDocument();

    fireEvent.click(editButton);

    const dialog = getByTestId('dialog');
    const dialogTitle = getByText('Edit task information');
    const form = getByRole('form');
    const nameInput = getByLabelText('Name');
    const dateInput = getByLabelText('Date');
    const confirmButton = within(form).getByText('Edit');

    expect(dialog).toContainElement(dialogTitle);
    expect(dialog).toContainElement(form);
    expect(confirmButton).toHaveTextContent('Edit');
    expect(nameInput).toHaveValue('meeting');
    expect(dateInput).toHaveValue('2018-02-04T15:06:46.000');

    fireEvent.change(nameInput, { target: { value: updatedTask.title } });
    fireEvent.change(dateInput, {
      target: { value: updatedTask.date },
    });
    await act(() => fireEvent.click(confirmButton));
    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
    await waitFor(() => expect(loader).not.toBeInTheDocument(), {
      timeout: 1200,
    });

    const updatedCard = await findByTestId('card');
    const updatedImage = updatedCard.querySelector('img') as HTMLImageElement;
    const iconImportant = within(updatedCard).queryByTestId('star-icon');

    expect(updatedCard).toHaveTextContent('important date');
    expect(updatedCard).toHaveTextContent('20.12.2023 07:30:15 pm');
    expect(updatedCard).toHaveTextContent('72e14782');
    expect(updatedCard).toContainElement(updatedImage);
    expect(updatedCard).not.toContainElement(iconImportant);
    expect(updatedImage.src).toMatch(/map\.png/);
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

  test("should appears an error if task being updated wasn't found in DB", async () => {
    jest
      .spyOn(taskService, 'updateTask')
      .mockRejectedValueOnce(new Error("Specified task wasn't found"));

    const { findByText, getByRole, findByTestId } = renderWithProviders(
      <TaskCard />,
    );

    const editCardButton = await findByText('Edit');
    fireEvent.click(editCardButton);
    const form = getByRole('form');
    const confirmButton = within(form).getByText('Edit');
    fireEvent.click(confirmButton);

    const error = await findByTestId('info-title');

    expect(error).toHaveTextContent("Specified task wasn't found");
  });
});
