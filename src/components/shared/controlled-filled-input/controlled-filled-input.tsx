import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import type { TextFieldProps } from '@mui/material/TextField';

import { FilledInput } from '@/components/shared/filled-input';

type Props<T extends FieldValues> = {
  validationMessage?: string;
} & UseControllerProps<T> &
  Omit<TextFieldProps, 'onChange' | 'value' | 'variant'>;

export const ControlledFilledInput = <T extends FieldValues>({
  name,
  control,
  ref,
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

  return (
    <FilledInput inputRef={ref} value={value} onChange={onChange} {...rest} />
  );
};
