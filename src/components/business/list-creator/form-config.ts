import { TFunction } from 'i18next';

import { AvailablePickerLocales } from '@/components/shared/controlled-date-picker/types';
import { ITaskFormConfig } from '@/components/shared/task-form';
import { dateFormats } from '@/constants/date-formats';

export const getTaskCreateConfig = (
  t: TFunction,
  language: string,
  isDarkTheme: boolean,
): ITaskFormConfig => {
  return {
    imageField: {
      label: t('create_form_config.image_button_text'),
    },
    nameField: {
      label: t('create_form_config.name_label'),
      validation: {
        required: {
          value: true,
          message: t('create_form_config.name_validation'),
        },
        maxLength: {
          value: 300,
          message: t('create_form_config.max_length_validation'),
        },
      },
      formatRegExp: '[a-z0-9а-я\\s]+$',
    },
    dateField: {
      label: t('create_form_config.date_label'),
      validationMsg: t('create_form_config.date_validation'),
      locale: language as AvailablePickerLocales,
      dateFormat: dateFormats[language],
      datePickerMode: isDarkTheme ? 'dark' : 'light',
    },
    checkboxImportant: {
      label: t('create_form_config.checkbox-important_label'),
    },
    cancelButtonTitle: t('create_form_config.cancel_button'),
    confirmButtonTitle: t('create_form_config.add_button'),
  };
};
