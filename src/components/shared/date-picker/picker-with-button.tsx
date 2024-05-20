import { useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Dayjs } from 'dayjs';

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
  const [date, setDate] = useState<Dayjs | null>(null);
  const {
    field: { onChange },
  } = useController({
    name: props.name,
    control: props.control,
    rules: {
      required: true,
    },
  });

  const onDatePickerChange = (value: Dayjs) => {
    onChange(value.toDate());
    setDate(value);
  };

  const buttonLabel = props.error
    ? props.validationMessage
    : (date && date.format(props.dateFormat)) || props.buttonLabel;

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={props.locale}
    >
      <DatePicker
        label={buttonLabel}
        value={date}
        onChange={onDatePickerChange}
        error={props.error}
        buttonClassName={'datepicker__button'}
        className={'datepicker'}
      />
    </LocalizationProvider>
  );
};
