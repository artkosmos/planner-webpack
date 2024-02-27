import React from 'react';
import {
  ButtonOutlined,
  ButtonPrimary,
  ControlledDateInput,
  ControlledFilledInput,
  type ITaskFormConfig,
} from '@/components/shared';
import { useForm } from 'react-hook-form';
import type { ITask } from '@/common';
import './style.scss';
import {
  EditFormButtons,
  type EditTaskFormFields,
  type IEditTaskAction,
} from './types';

interface IButtonAction {
  name: EditFormButtons;
  data?: EditTaskFormFields;
}

type Props = {
  task: ITask;
  onAction?: ({ model, name }: IEditTaskAction) => void;
  config: ITaskFormConfig;
};

export const TaskForm = ({ task, onAction, config }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditTaskFormFields>({
    defaultValues: { title: task.title, date: task.date },
  });

  const isError = errors.title || errors.date;

  const buttonActionHandler = ({ name, data }: IButtonAction) => {
    switch (name) {
      case EditFormButtons.CANCEL: {
        onAction({ name });
        break;
      }
      case EditFormButtons.CONFIRM: {
        if (data) {
          const { title, date } = data;
          onAction({ name, model: { date, title, id: task.id } });
          break;
        }
      }
    }
  };

  return (
    <form
      className={'task-form'}
      onSubmit={handleSubmit(data => {
        buttonActionHandler({ name: EditFormButtons.CONFIRM, data });
      })}
    >
      <ControlledFilledInput
        name={'title'}
        control={control}
        className={'task-form__name-input'}
        label={'Task name'}
      />
      <ControlledDateInput name={'date'} control={control} />
      {isError && (
        <span className={'task-form__error-message'}>
          All fields are required
        </span>
      )}
      <div className={'task-form__button-container'}>
        <ButtonOutlined
          onClick={() => buttonActionHandler({ name: EditFormButtons.CANCEL })}
          title={config.cancelButtonTitle}
        />
        <ButtonPrimary type={'submit'} title={config.confirmButtonTitle} />
      </div>
    </form>
  );
};
