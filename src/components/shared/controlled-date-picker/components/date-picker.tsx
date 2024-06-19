import { useState } from 'react';
import { Theme, ThemeProvider } from '@mui/material/styles';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { Dayjs } from 'dayjs';

import { ButtonField } from './button-field';

export const DatePicker = (
  props: Omit<DatePickerProps<Dayjs>, 'open' | 'onOpen' | 'onClose'> & {
    error?: boolean;
    buttonClassName?: string;
    theme: Theme;
  },
) => {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={props.theme}>
      <DateTimePicker
        slots={{ ...props.slots, field: ButtonField }}
        slotProps={{
          ...props.slotProps,
          field: {
            setOpen,
            error: props.error,
            buttonClassName: props.buttonClassName,
          } as never,
          actionBar: {
            actions: ['cancel', 'accept'],
          },
        }}
        views={['year', 'month', 'day', 'hours', 'minutes']}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        dayOfWeekFormatter={weekday => `${weekday.format('dd')}`.toUpperCase()}
        reduceAnimations={true}
      />
    </ThemeProvider>
  );
};
