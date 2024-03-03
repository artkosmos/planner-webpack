import { useRef } from 'react';
import {
  type FieldValues,
  useController,
  type UseControllerProps,
  type UseFormClearErrors,
  type UseFormSetError,
} from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

const dateInputFormat = 'DD.MM.YYYY HH:mm:ss';
const minSelectableDate = '0100-01-01 00:00:00';
const maxSelectableDate = '9999-01-01 00:00:00';

type Props<T extends FieldValues> = UseControllerProps<T> & {
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
};

export const ControlledDateInput = <T extends FieldValues>({
  name,
  control,
  setError,
  clearErrors,
}: Props<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    field: { value, onChange },
    fieldState: { error: fieldFormError },
  } = useController({
    name,
    control,
    rules: {
      required: 'Field is required',
      validate: (value: string) => {
        const inputDate = inputRef.current
          ? dayjs(inputRef.current.value, dateInputFormat)
          : dayjs(value);

        if (inputDate.isValid()) {
          return true;
        } else {
          return 'Invalid date';
        }
      },
    },
  });

  const onDatePickerChange = (value: Dayjs) => {
    if (!value || !value.isValid()) {
      return;
    }
    onChange(value.toDate().toISOString());
  };

  const onDatePickerError = (error: null | string) => {
    if (error) {
      setError(name, { message: 'Invalid date' });
    } else {
      clearErrors(name);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          className={'date-picker'}
          slotProps={{
            textField: {
              variant: 'filled',
              sx: { backgroundColor: '#e5efff' },
              error: !!fieldFormError,
              label: fieldFormError ? fieldFormError.message : 'Date',
            },
          }}
          ampm={false}
          value={value ? dayjs(value) : null}
          views={['year', 'month', 'day']}
          format={dateInputFormat}
          onChange={onDatePickerChange}
          minDate={dayjs(minSelectableDate)}
          maxDate={dayjs(maxSelectableDate)}
          onError={onDatePickerError}
          inputRef={inputRef}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
