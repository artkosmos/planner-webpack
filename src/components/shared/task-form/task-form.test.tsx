import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { formConfig } from '@/__mocks__/form-config';
import { actualTask, newTask } from '@/__mocks__/task';

import { TaskForm } from './task-form';

import '@testing-library/jest-dom';

describe('testing of task form component', () => {
  const onAction = jest.fn();

  afterEach(() => {
    onAction.mockClear();
  });

  test('should render a new empty form according to passed config', async () => {
    const { getByText, getByLabelText, getByRole, getByTestId } = render(
      <TaskForm task={newTask} onAction={onAction} config={formConfig} />,
    );

    const nameField = getByLabelText(formConfig.nameField.label);
    const nameFieldLabel = getByText(formConfig.nameField.label);
    const imageField = getByTestId('task-image') as HTMLInputElement;
    const imageFieldButton = getByRole('button', {
      name: formConfig.imageField.label,
    });
    const dateFieldButton = getByRole('button', {
      name: formConfig.dateField.label,
    });
    const importantField = getByLabelText(formConfig.checkboxImportant.label);
    const importantFieldLabel = getByText(formConfig.checkboxImportant.label);
    const isDoneField = getByLabelText(formConfig.checkboxIsDone.label);
    const isDoneFieldLabel = getByText(formConfig.checkboxIsDone.label);
    const cancelButton = getByRole('button', {
      name: formConfig.cancelButtonTitle,
    });
    const confirmButton = getByRole('button', {
      name: formConfig.confirmButtonTitle,
    });

    expect(nameField).toHaveValue('');
    expect(nameFieldLabel).toHaveTextContent('Task Name');
    expect(imageField).toHaveValue('');
    expect(imageFieldButton).toHaveTextContent('Task Image');
    expect(dateFieldButton).toHaveTextContent('Task Date');
    expect(importantField).not.toBeChecked();
    expect(importantFieldLabel).toHaveTextContent('Important');
    expect(isDoneField).not.toBeChecked();
    expect(isDoneFieldLabel).toHaveTextContent('Completed');
    expect(cancelButton).toHaveTextContent('Cancel');
    expect(confirmButton).toHaveTextContent('Confirm');
  });

  test('should render a update form with filled values', async () => {
    const { getByLabelText, getByTestId } = render(
      <TaskForm task={actualTask} onAction={onAction} config={formConfig} />,
    );

    const nameField = getByLabelText(formConfig.nameField.label);
    const imageField = getByTestId('task-image') as HTMLInputElement;
    const dateFieldButton = getByTestId('datepicker-button');
    const importantField = getByLabelText(formConfig.checkboxImportant.label);
    const isDoneField = getByLabelText(formConfig.checkboxIsDone.label);

    expect(nameField).toHaveValue('existing task');
    expect(imageField).toHaveValue('');
    expect(dateFieldButton).toHaveTextContent('12/27/1993 03:12 PM');
    expect(importantField).toBeChecked();
    expect(isDoneField).toBeChecked();
  });

  test('should call an action when confirm button is pressed', async () => {
    const { getByLabelText, getByRole } = render(
      <TaskForm task={actualTask} onAction={onAction} config={formConfig} />,
    );

    const isDoneField = getByLabelText(formConfig.checkboxIsDone.label);
    const nameField = getByLabelText(formConfig.nameField.label);
    const confirmButton = getByRole('button', {
      name: formConfig.confirmButtonTitle,
    });
    fireEvent.click(isDoneField);
    fireEvent.change(nameField, { target: { value: 'swimming' } });
    fireEvent.click(confirmButton);

    expect(isDoneField).not.toBeChecked();
    await waitFor(() =>
      expect(onAction).toHaveBeenCalledWith({
        model: {
          date: '1993-12-27T15:12:31',
          id: '37dd67fd',
          title: 'swimming',
          important: true,
          image: null,
          isDone: false,
        },
        name: 'confirm',
      }),
    );
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  test('should call an action on close button click', async () => {
    const { getByRole } = render(
      <TaskForm task={newTask} onAction={onAction} config={formConfig} />,
    );

    const cancelButton = getByRole('button', {
      name: formConfig.cancelButtonTitle,
    });

    fireEvent.click(cancelButton);

    expect(onAction).toHaveBeenCalledWith({ name: 'cancel' });
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  test('confirm button should be disabled if fields are not dirty', async () => {
    const { getByRole } = render(
      <TaskForm task={newTask} onAction={onAction} config={formConfig} />,
    );

    const confirmButton = getByRole('button', {
      name: formConfig.confirmButtonTitle,
    });

    expect(confirmButton).toBeDisabled();
  });

  test('should show errors for invalid fields', async () => {
    const { getByRole, getByText, getByLabelText, getByTestId } = render(
      <TaskForm task={newTask} onAction={onAction} config={formConfig} />,
    );

    const nameField = getByLabelText(formConfig.nameField.label);
    const nameFieldLabel = getByText(formConfig.nameField.label);
    const dateFieldButton = getByTestId('datepicker-button');
    const confirmButton = getByRole('button', {
      name: formConfig.confirmButtonTitle,
    });

    fireEvent.change(nameField, { target: { value: 'lollipop' } });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(nameFieldLabel).not.toHaveTextContent('Task name is required');
      expect(dateFieldButton).toHaveTextContent('Invalid date format');
    });

    fireEvent.change(nameField, { target: { value: '' } });

    await waitFor(() => {
      expect(nameFieldLabel).toHaveTextContent('Task name is required');
      expect(dateFieldButton).toHaveTextContent('Invalid date format');
    });

    const stringOverLimit = 'lol'.repeat(
      formConfig.nameField.validation.maxLength.value + 1,
    );
    fireEvent.change(nameField, { target: { value: stringOverLimit } });

    await waitFor(() => {
      expect(nameFieldLabel).not.toHaveTextContent('Task name is required');
      expect(nameFieldLabel).toHaveTextContent(
        'Task name should not exceed 20 characters',
      );
      expect(dateFieldButton).toHaveTextContent('Invalid date format');
    });
  });

  test('should apply RegExp to the input field', async () => {
    const regExp = '[a-z0-9а-я\\s]+$';
    const { getByLabelText } = render(
      <TaskForm
        task={newTask}
        onAction={onAction}
        config={{
          ...formConfig,
          nameField: { ...formConfig.nameField, formatRegExp: regExp },
        }}
      />,
    );

    const nameField = getByLabelText(formConfig.nameField.label);

    await userEvent.type(nameField, 'test str&#ing $%123&&');

    expect(nameField).toHaveValue('test string 123');
  });

  test('should trigger blur when form is submitted on Enter', () => {
    const { getByLabelText } = render(
      <TaskForm task={newTask} onAction={onAction} config={formConfig} />,
    );

    const nameField = getByLabelText(formConfig.nameField.label);
    fireEvent.keyUp(nameField, { key: 'Enter' });

    expect(document.activeElement).not.toBe(nameField);
  });
});
