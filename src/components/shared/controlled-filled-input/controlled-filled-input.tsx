import type { ChangeEvent } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import type { TextFieldProps } from '@mui/material/TextField';

import { FilledInput } from '@/components/shared/filled-input';

type Props<T extends FieldValues> = {
  regExp?: string;
  validationMessage?: string;
} & UseControllerProps<T> &
  Omit<TextFieldProps, 'onChange' | 'value' | 'variant'>;

export const ControlledFilledInput = <T extends FieldValues>({
  name,
  control,
  ref,
  regExp,
  validationMessage,
  ...rest
}: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules: { required: validationMessage },
  });

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.currentTarget.value;
    const validation = new RegExp(regExp);

    if (!validation.test(currentValue) && currentValue.length) {
      return;
    }
    onChange(currentValue);
  };

  return (
    <FilledInput
      inputRef={ref}
      value={value}
      onChange={inputHandler}
      {...rest}
    />
  );
};
