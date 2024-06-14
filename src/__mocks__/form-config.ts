import { ITaskFormConfig } from '@/components/shared/task-form';

export const formConfig: ITaskFormConfig = {
  imageField: {
    label: 'Task Image',
  },
  nameField: {
    label: 'Task Name',
    validation: {
      required: {
        value: true,
        message: 'Task name is required',
      },
      maxLength: {
        value: 20,
        message: 'Task name should not exceed 20 characters',
      },
    },
    formatRegExp: undefined,
  },
  dateField: {
    label: 'Task Date',
    validationMsg: 'Invalid date format',
    locale: 'en',
    dateFormat: 'MM/DD/YYYY hh:mm A',
    datePickerMode: 'light',
  },
  checkboxImportant: {
    label: 'Important',
  },
  checkboxIsDone: {
    label: 'Completed',
  },
  cancelButtonTitle: 'Cancel',
  confirmButtonTitle: 'Confirm',
};
