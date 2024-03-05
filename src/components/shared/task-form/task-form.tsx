import { useForm } from 'react-hook-form';

import type { ITask } from '@/common/types';
import { ControlledDateInput } from '@/components/shared/controlled-date-input';
import { ControlledFilledInput } from '@/components/shared/controlled-filled-input';
import { ButtonOutlined } from '@/components/shared/outlined-button';
import { ButtonPrimary } from '@/components/shared/primary-button';

import {
  EditFormButtons,
  type EditTaskFormFields,
  type IEditTaskAction,
  type ITaskFormConfig,
} from './types';

import './style.scss';

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
