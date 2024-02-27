import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

type Props<T extends FieldValues> = UseControllerProps<T>;

export const ControlledDateInput = <T extends FieldValues>({
  name,
  control,
}: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  const onDatePickerChange = (value: Dayjs) => {
    onChange(value.toDate().toISOString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          ampm={false}
          value={value ? dayjs(value) : null}
          views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          format={'DD.MM.YYYY HH:mm:ss'}
          onAccept={onDatePickerChange}
          label="Choose date"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
