import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import type { TextFieldProps } from '@mui/material/TextField';
import { FilledInput } from '@/components/shared';

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, 'onChange' | 'value' | 'variant'>;

export const ControlledFilledInput = <T extends FieldValues>({
  name,
  control,
  ...rest
}: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return <FilledInput value={value} onChange={onChange} {...rest} />;
};
