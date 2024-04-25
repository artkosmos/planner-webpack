import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { ITask } from '@/common/types';
import { ControlledCheckbox } from '@/components/shared/controlled-checkbox';
import { ControlledFilledInput } from '@/components/shared/controlled-filled-input';
import { DateInput } from '@/components/shared/date-input';
import { ButtonOutlined } from '@/components/shared/outlined-button';
import { ButtonPrimary } from '@/components/shared/primary-button';

import { ControlledImageUploader } from '../controlled-image-uploader';
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
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EditTaskFormFields>({
    defaultValues: {
      title: task.title,
      date: task.date,
      image: task.image,
      important: task.important,
    },
  });

  useEffect(() => {
    const handleEnterPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        (event.target as HTMLElement).blur();
      }
    };
    document.addEventListener('keyup', handleEnterPress);

    return () => document.removeEventListener('keyup', handleEnterPress);
  }, []);

  const fileClearHandler = () => {
    setValue('image', task.image);
  };

  const buttonActionHandler = ({ name, data }: IButtonAction) => {
    switch (name) {
      case EditFormButtons.CANCEL: {
        onAction({ name });
        break;
      }
      case EditFormButtons.CONFIRM: {
        if (data) {
          const { title, date, image, important } = data;
          onAction({
            name,
            model: { date, title, image, important, id: task.id },
          });
          break;
        }
      }
    }
  };

  return (
    <form
      role="form"
      className={'task-form'}
      onSubmit={handleSubmit(data => {
        buttonActionHandler({ name: EditFormButtons.CONFIRM, data });
      })}
    >
      <ControlledImageUploader
        name={'image'}
        control={control}
        buttonText={config.imageButtonTitle}
        className={'task-form__file-input'}
        clearInput={fileClearHandler}
      />
      <ControlledFilledInput
        name={'title'}
        control={control}
        className={'task-form__name-input'}
        label={errors.title ? errors.title.message : config.nameFieldLabel}
        error={!!errors.title}
        regExp={config.nameFieldRegExp}
        validationMessage={config.nameRequiredValidationMsg}
        autoFocus
      />
      <DateInput
        {...register('date', { required: config.dateRequiredValidationMsg })}
        error={errors.date ? errors.date.message : null}
        label={config.dateFieldLabel}
      />
      <ControlledCheckbox
        name={'important'}
        control={control}
        labelText={config.checkboxLabel}
        className={'task-form__checkbox'}
      />
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
