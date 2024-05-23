import { FieldValues, UseControllerProps } from 'react-hook-form';

export type AvailablePickerLocales = 'ru' | 'en';
export type AvailablePickerMode = 'dark' | 'light';

export type PickerProps<T extends FieldValues> = UseControllerProps<T> & {
  buttonLabel: string;
  dateFormat: string;
  className?: string;
  validationMessage?: string;
  error?: boolean;
  theme?: AvailablePickerMode;
  locale?: AvailablePickerLocales;
};
