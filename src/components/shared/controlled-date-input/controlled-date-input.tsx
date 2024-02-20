import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {type FieldValues, useController, type UseControllerProps} from "react-hook-form";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, {Dayjs} from "dayjs";


type Props<T extends FieldValues> = UseControllerProps<T>

export const ControlledDateInput = <T extends FieldValues>({name, control}: Props<T>) => {
  const {
    field: {value, onChange},
  } = useController({
    name,
    control,
  })

  const onDatePickerChange = (value: Dayjs) => {
    onChange(value.toDate())
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          value={dayjs(value)}
          views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          format={"DD.MM.YYYY h:mm:ss a"}
          onAccept={onDatePickerChange}
          label="Choose date"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};