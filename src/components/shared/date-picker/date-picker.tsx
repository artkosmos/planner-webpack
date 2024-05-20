import { useState } from 'react';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { Dayjs } from 'dayjs';

import { ButtonField } from './button-field';

import './style.scss';

export const DatePicker = (
  props: Omit<DatePickerProps<Dayjs>, 'open' | 'onOpen' | 'onClose'> & {
    error?: boolean;
    buttonClassName?: string;
  },
) => {
  const [open, setOpen] = useState(false);

  return (
    <DateTimePicker
      slots={{ ...props.slots, field: ButtonField }}
      slotProps={{
        ...props.slotProps,
        field: {
          setOpen,
          error: props.error,
          buttonClassName: props.buttonClassName,
        } as never,
      }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
};
