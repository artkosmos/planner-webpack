import type {ITask} from "@/common";

export enum EditFormButtons {
  CANCEL = 'cancel',
  CONFIRM = 'confirm'
}

export interface IEditTaskAction {
  model?: ITask
  name: EditFormButtons
}

export interface EditTaskFormFields {
  title: string
  date: string
}

export interface ITaskFormConfig {
  cancelButtonTitle: string
  confirmButtonTitle: string
}