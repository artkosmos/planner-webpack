import React from 'react';
import {ButtonOutlined, ButtonPrimary, FilledInput} from "@/components/shared";
import {useController, useForm} from "react-hook-form";
import type {ITask} from "@/common";
import './style.scss'
import type {IEditTaskAction} from "../task-card";

export enum EditFormButtons {
  CANCEL = 'cancel',
  SAVE = 'save'
}

interface EditTaskFormFields {
  title: string
  date: string
}

type Props = {
  task: ITask
  onAction?: ({model, name}: IEditTaskAction) => void
}

export const EditTaskForm = ({task, onAction}: Props) => {
  const {handleSubmit, control, formState: {errors}} = useForm<EditTaskFormFields>({
    defaultValues: {title: task.title, date: task.date}
  })

  const {field: taskNameField} = useController({
    name: "title",
    control,
    defaultValue: task.title,
    rules: {required: true}
  });

  const {field: createdAtField} = useController({
    name: "date",
    control,
    defaultValue: task.date,
    rules: {required: true}
  });

  const buttonActionHandler = (name: EditFormButtons, data: EditTaskFormFields) => {
    switch (name) {
      case EditFormButtons.CANCEL:
        onAction({name})
        break
      case EditFormButtons.SAVE:
        if (data) {
          const {title, date} = data
          onAction({name, model: {date, title, id: task.id}})
        }
    }
  }

  return (
    <form
      className={'task-edit-form'}
      onSubmit={handleSubmit(data => {
        buttonActionHandler(EditFormButtons.SAVE, data)
      })}>
      <FilledInput label={'ID'} value={task.id} disabled/>
      <FilledInput
        {...taskNameField}
        error={!!errors.title}
        name={'taskName'}
        label={errors.title ? 'Specify the name' : 'Task name'}
      />
      <FilledInput
        {...createdAtField}
        error={!!errors.date}
        name={'createdAt'}
        label={errors.date ? 'Specify the date' : 'Created at'}
      />
      <div className={'task-edit-form__button-container'}>
        <ButtonOutlined
          onClick={() => buttonActionHandler(EditFormButtons.CANCEL, null)}
          title={'Cancel'}
        />
        <ButtonPrimary
          type={"submit"}
          title={'Save'}
        />
      </div>
    </form>
  );
};