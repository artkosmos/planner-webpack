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
  imageField: {
    label?: string;
  };
  nameField: {
    label?: string;
    validationMsg?: string;
    formatRegExp?: string;
  };
  dateField: {
    label?: string;
    validationMsg?: string;
    locale?: string;
    dateFormat?: string;
    datePickerMode?: 'dark' | 'light';
  };
  checkbox: {
    label?: string;
  };
  cancelButtonTitle: string;
  confirmButtonTitle: string;
}
