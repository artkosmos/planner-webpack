import React from 'react';
import {ButtonOutlined, ButtonPrimary, FilledInput} from "@/components/shared";
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