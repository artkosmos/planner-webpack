import { useMemo, useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import clsx from 'clsx';
import { Dayjs } from 'dayjs';

import { useDarkTheme } from '@/utils/use-dark-theme';

import { DatePicker } from './date-picker';

import 'dayjs/locale/ru';

type PickerProps<T extends FieldValues> = UseControllerProps<T> & {
  buttonLabel: string;
  dateFormat: string;
  locale?: string;
  className?: string;
  validationMessage?: string;
  error?: boolean;
};

export const PickerWithButtonField = <T extends FieldValues>(
  props: PickerProps<T>,
) => {
  const {
    name,
    control,
    locale,
    dateFormat,
    validationMessage,
    error,
    buttonLabel,
  } = props;

  const [date, setDate] = useState<Dayjs | null>(null);
  const { isDark } = useDarkTheme();
  const {
    field: { onChange },
  } = useController({
    name,
    control,
    rules: {
      required: true,
    },
  });

  const onDatePickerChange = (value: Dayjs) => {
    onChange(value.toDate());
    setDate(value);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? 'dark' : 'light',
        },
      }),
    [isDark],
  );

  const classNames = useMemo(
    () => ({
      buttonField: clsx(
        'datepicker__button',
        error && 'datepicker__button_error',
      ),
      datepicker: 'datepicker',
    }),
    [error],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DatePicker
        label={
          error
            ? validationMessage
            : (date && date.format(dateFormat)) || buttonLabel
        }
        value={date}
        onChange={onDatePickerChange}
        error={error}
        buttonClassName={classNames.buttonField}
        className={classNames.datepicker}
        theme={theme}
      />
    </LocalizationProvider>
  );
};
