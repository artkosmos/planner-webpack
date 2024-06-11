import { useMemo } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import clsx from 'clsx';
import dayjs from 'dayjs';

import { DatePicker } from './components';
import { localeText } from './locale-text';
import { PickerProps } from './types';

import './style.scss';

export const PickerWithButtonField = <T extends FieldValues>(
  props: PickerProps<T>,
) => {
  const {
    name,
    control,
    dateFormat,
    validationMessage,
    error,
    buttonLabel,
    theme,
    locale,
  } = props;

  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules: {
      required: true,
    },
  });

  const currentTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme || 'light',
        },
      }),
    [theme],
  );

  const isFormattedDate = value && dayjs(value).format(dateFormat);

  const classNames = {
    buttonField: clsx(
      'datepicker__button',
      error && 'datepicker__button_error',
      isFormattedDate && 'datepicker__button_large',
    ),
    datepicker: 'datepicker',
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={locale}
      localeText={localeText[locale]}
    >
      <DatePicker
        label={error ? validationMessage : isFormattedDate || buttonLabel}
        value={dayjs(value)}
        onAccept={value => onChange(value.toDate())}
        error={error}
        buttonClassName={classNames.buttonField}
        className={classNames.datepicker}
        theme={currentTheme}
        closeOnSelect={false}
      />
    </LocalizationProvider>
  );
};
