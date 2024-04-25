import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ITask } from '@/common/types';
import { ITaskFormConfig } from '@/components/shared/task-form/types';

import { TaskForm } from './task-form';

import '@testing-library/jest-dom';

describe('testing of task form component', () => {
  const onAction = jest.fn();
  const config: ITaskFormConfig = {
    nameFieldLabel: 'Title',
    nameRequiredValidationMsg: 'Title is required',
    dateFieldLabel: 'Date',
    dateRequiredValidationMsg: 'Date is required',
    cancelButtonTitle: 'Cancel',
    confirmButtonTitle: 'Confirm',
    imageButtonTitle: 'Choose image',
  };
  const newTask: ITask = {
    id: '',
    title: '',
    date: '',
    image: null,
    important: false,
  };
  const existingTask: ITask = {
    id: '37dd67fd',
    title: 'existing task',
    date: '1993-12-27T15:12:31.000',
    image: null,
    important: true,
  };

  afterEach(() => {
    onAction.mockClear();
  });

  test('should render for task creation with empty fields', async () => {
    const { getByText, getByLabelText } = render(
      <TaskForm task={newTask} onAction={onAction} config={config} />,
    );

    const nameField = getByLabelText(config.nameFieldLabel);
    const nameFieldLabel = getByText(config.nameFieldLabel);
    const dateField = getByLabelText(config.dateFieldLabel);
    const dateFieldLabel = getByText(config.dateFieldLabel);

    expect(nameFieldLabel).toHaveTextContent('Title');
    expect(dateFieldLabel).toHaveTextContent('Date');
    expect(nameField).toHaveValue('');
    expect(dateField).toHaveValue('');
  });

  test('should render for task updating with filled fields', async () => {
    const { getByText, getByLabelText } = render(
      <TaskForm task={existingTask} onAction={onAction} config={config} />,
    );

    const nameField = getByLabelText(config.nameFieldLabel);
    const nameFieldLabel = getByText(config.nameFieldLabel);
    const dateField = getByLabelText(config.dateFieldLabel);
    const dateFieldLabel = getByText(config.dateFieldLabel);

    expect(nameFieldLabel).toHaveTextContent('Title');
    expect(dateFieldLabel).toHaveTextContent('Date');
    expect(nameField).toHaveValue(existingTask.title);
    expect(dateField).toHaveValue(existingTask.date);
  });

  test('should call an action on confirm button click', async () => {
    const { getByRole, getByLabelText } = render(
      <TaskForm task={newTask} onAction={onAction} config={config} />,
    );

    const nameField = getByLabelText(config.nameFieldLabel);
    const dateField = getByLabelText(config.dateFieldLabel);
    const confirmButton = getByRole('button', {
      name: config.confirmButtonTitle,
    });

    fireEvent.change(nameField, { target: { value: 'running' } });
    fireEvent.change(dateField, {
      target: { value: '2024-06-23T17:00' },
    });
    fireEvent.click(confirmButton);

    await waitFor(() =>
      expect(onAction).toHaveBeenCalledWith({
        model: {
          date: '2024-06-23T17:00',
          id: '',
          title: 'running',
          important: false,
          image: null,
        },
        name: 'confirm',
      }),
    );
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  test('should call an action on close button click', async () => {
    const { getByRole } = render(
      <TaskForm task={newTask} onAction={onAction} config={config} />,
    );

    const cancelButton = getByRole('button', {
      name: config.cancelButtonTitle,
    });

    fireEvent.click(cancelButton);

    expect(onAction).toHaveBeenCalledWith({ name: 'cancel' });
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  test('should show errors for invalid fields', async () => {
    const { getByRole, getByText, getByLabelText } = render(
      <TaskForm task={newTask} onAction={onAction} config={config} />,
    );

    const nameField = getByLabelText(config.nameFieldLabel);
    const nameFieldLabel = getByText(config.nameFieldLabel);
    const dateField = getByLabelText(config.dateFieldLabel);
    const dateFieldLabel = getByText(config.dateFieldLabel);
    const confirmButton = getByRole('button', {
      name: config.confirmButtonTitle,
    });

    fireEvent.change(nameField, { target: { value: '' } });
    fireEvent.change(dateField, { target: { value: 'wrong date' } });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(nameFieldLabel).toHaveTextContent(
        config.nameRequiredValidationMsg,
      );
      expect(dateFieldLabel).toHaveTextContent(
        config.dateRequiredValidationMsg,
      );
    });
  });

  test('should apply RegExp to the input field', async () => {
    const regExp = '[a-z0-9а-я\\s]+$';
    const { getByLabelText } = render(
      <TaskForm
        task={newTask}
        onAction={onAction}
        config={{ ...config, nameFieldRegExp: regExp }}
      />,
    );

    const nameField = getByLabelText(config.nameFieldLabel);

    await userEvent.type(nameField, 'test str&#ing $%123&&');

    expect(nameField).toHaveValue('test string 123');
  });

  it('should trigger blur when form is submitted on Enter', () => {
    const { getByLabelText } = render(
      <TaskForm task={newTask} onAction={onAction} config={config} />,
    );

    const nameField = getByLabelText(config.nameFieldLabel);
    fireEvent.keyUp(nameField, { key: 'Enter' });

    expect(document.activeElement).not.toBe(nameField);
  });
});
