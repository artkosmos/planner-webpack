import type { ITask } from '@/common/types';

export enum EditFormButtons {
  CANCEL = 'cancel',
  CONFIRM = 'confirm',
}

export interface IEditTaskAction {
  model?: ITask;
  name: EditFormButtons;
}

export interface EditTaskFormFields {
  title: string;
  date: string;
  image?: string | null;
  important: boolean;
}

export interface ITaskFormConfig {
  cancelButtonTitle: string;
  confirmButtonTitle: string;
  imageButtonTitle: string;
  nameFieldLabel?: string;
  nameRequiredValidationMsg?: string;
  dateRequiredValidationMsg?: string;
  dateFieldLabel?: string;
  nameFieldRegExp?: string;
  checkboxLabel?: string;
}
