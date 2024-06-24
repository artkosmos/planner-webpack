import { Dispatch, SetStateAction } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Button from '@mui/material/Button';
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField';
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from '@mui/x-date-pickers/models';

import { Dayjs } from 'dayjs';

interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs, false>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      false,
      DateValidationError
    > {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export const ButtonField = (
  props: ButtonFieldProps & {
    error?: boolean;
    buttonClassName?: string;
  },
) => {
  const {
    setOpen,
    label,
    id,
    error,
    buttonClassName,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      ref={ref}
      className={buttonClassName}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev: boolean) => !prev)}
      color={error ? 'error' : 'primary'}
      endIcon={<CalendarMonthIcon />}
      data-testid={'datepicker-button'}
    >
      {label}
    </Button>
  );
};
