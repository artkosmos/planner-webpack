import React from 'react';
import {ButtonOutlined, ButtonPrimary, ControlledDateInput, FilledInput} from "@/components/shared";
import {useController, useForm} from "react-hook-form";
import type {ITask} from "@/common";
import './style.scss'
import {EditFormButtons, type EditTaskFormFields, type IEditTaskAction} from "./types";

interface IButtonAction {
  name: EditFormButtons
  data?: EditTaskFormFields
}

type Props = {
  task: ITask
  onAction?: ({model, name}: IEditTaskAction) => void
}

export const EditTaskForm = ({task, onAction}: Props) => {
  const {handleSubmit, control, formState: {errors}} = useForm<EditTaskFormFields>({
    defaultValues: {title: task.title, date: JSON.parse(task.date)}
  })

  const {field: taskNameField} = useController({
    name: "title",
    control,
    defaultValue: task.title,
    rules: {required: true}
  });

  const buttonActionHandler = ({name, data}: IButtonAction) => {
    switch (name) {
      case EditFormButtons.CANCEL:
        onAction({name})
        break;
      case EditFormButtons.SAVE:
        if (data) {
          const {title, date} = data
          onAction({name, model: {date, title, id: task.id}})
          break;
        }
    }
  }

  return (
    <form
      className={'task-edit-form'}
      onSubmit={handleSubmit(data => {
        buttonActionHandler({name: EditFormButtons.SAVE, data})
      })}>
      <FilledInput
        className={'task-edit-form__name-input'}
        {...taskNameField}
        error={!!errors.title}
        name={'taskName'}
        label={errors.title ? 'Specify the name' : 'Task name'}
      />
      <ControlledDateInput
        name={'date'}
        control={control}
      />
      <div className={'task-edit-form__button-container'}>
        <ButtonOutlined
          onClick={() => buttonActionHandler({name: EditFormButtons.CANCEL})}
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