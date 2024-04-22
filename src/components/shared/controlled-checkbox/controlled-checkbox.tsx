import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

import clsx from 'clsx';

import './style.scss';

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'onChange' | 'checked' | 'id'> & {
    labelText?: string;
  };

export const ControlledCheckbox = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, defaultValue, labelText, className, ...rest } = props;

  const {
    field: { onChange, value },
  } = useController({ name, control, defaultValue });

  const classNames = {
    checkbox: clsx('checkbox', className),
    label: clsx('checkbox__label'),
  };

  return (
    <div className={classNames.checkbox}>
      <Checkbox
        {...rest}
        onChange={onChange}
        checked={value}
        id={name}
        name={name}
      />
      {labelText && (
        <label className={classNames.label} htmlFor={name}>
          {labelText}
        </label>
      )}
    </div>
  );
};
