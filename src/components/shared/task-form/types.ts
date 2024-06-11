import type { ITask } from '@/common/types';
import { TaskStatus } from '@/common/types';
import {
  AvailablePickerLocales,
  AvailablePickerMode,
} from '@/components/shared/date-picker/types';

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
  isDone: boolean;
  status: TaskStatus;
}

export interface ITaskFormConfig {
  imageField: {
    label?: string;
  };
  nameField: {
    label?: string;
    validation?: {
      required?: {
        value: boolean;
        message: string;
      };
      maxLength?: {
        value: number;
        message: string;
      };
    };
    formatRegExp?: string;
  };
  dateField: {
    label?: string;
    validationMsg?: string;
    locale?: AvailablePickerLocales;
    dateFormat?: string;
    datePickerMode?: AvailablePickerMode;
  };
  checkboxImportant: {
    label?: string;
  };
  checkboxIsDone?: {
    label?: string;
  };
  cancelButtonTitle: string;
  confirmButtonTitle: string;
}
