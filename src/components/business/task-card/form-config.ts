import { TFunction } from 'i18next';

import { AvailablePickerLocales } from '@/components/shared/controlled-date-picker/types';
import { ITaskFormConfig } from '@/components/shared/task-form';
import { dateFormats } from '@/constants/date-formats';

export const getTaskUpdateConfig = (
  t: TFunction,
  language: string,
  isDarkTheme: boolean,
): ITaskFormConfig => {
  return {
    imageField: {
      label: t('edit_form_config.image_button_text'),
    },
    nameField: {
      label: t('edit_form_config.name_label'),
      validation: {
        required: {
          value: true,
          message: t('edit_form_config.name_validation'),
        },
        maxLength: {
          value: 300,
          message: t('edit_form_config.max_length_validation'),
        },
      },
      formatRegExp: '^[a-zA-Z0-9а-яА-Я\\s]+$',
    },
    dateField: {
      label: t('edit_form_config.date_label'),
      validationMsg: t('edit_form_config.date_validation'),
      locale: language as AvailablePickerLocales,
      dateFormat: dateFormats[language],
      datePickerMode: isDarkTheme ? 'dark' : 'light',
    },
    checkboxImportant: {
      label: t('edit_form_config.checkbox-important_label'),
    },
    checkboxIsDone: {
      label: t('edit_form_config.checkbox-done_label'),
    },
    cancelButtonTitle: t('edit_form_config.cancel_button'),
    confirmButtonTitle: t('edit_form_config.edit_button'),
  };
};
