import { TFunction } from 'i18next';

import { AvailablePickerLocales } from '@/components/shared/date-picker/types';
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
      validationMsg: t('edit_form_config.name_validation'),
      formatRegExp: '[a-z0-9а-я\\s]+$',
    },
    dateField: {
      label: t('edit_form_config.date_label'),
      validationMsg: t('edit_form_config.date_validation'),
      locale: language as AvailablePickerLocales,
      dateFormat: dateFormats[language],
      datePickerMode: isDarkTheme ? 'dark' : 'light',
    },
    checkbox: {
      label: t('edit_form_config.checkbox_label'),
    },
    cancelButtonTitle: t('edit_form_config.cancel_button'),
    confirmButtonTitle: t('edit_form_config.edit_button'),
  };
};
