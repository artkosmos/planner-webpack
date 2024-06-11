import type { ChangeEvent } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

import { FilledInput } from '@/components/shared/filled-input';
import { FilledInputProps } from '@/components/shared/filled-input/filled-input';

interface ValidationRule {
  value: boolean | number;
  message: string;
}

interface Validation {
  required?: ValidationRule;
  maxLength?: ValidationRule;
}

type Props<T extends FieldValues> = {
  regExp?: string;
  validation?: Validation;
} & UseControllerProps<T> &
  Omit<FilledInputProps, 'onChange' | 'value' | 'variant'>;

export const ControlledFilledInput = <T extends FieldValues>({
  name,
  control,
  ref,
  regExp,
  validation,
  ...rest
}: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules: {
      required: {
        value: validation?.required.value as boolean,
        message: validation?.required.message,
      },
      maxLength: {
        value: validation?.maxLength.value as number,
        message: validation?.maxLength.message,
      },
    },
  });

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.currentTarget.value;
    const format = new RegExp(regExp);

    if (!format.test(currentValue) && currentValue.length) {
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
