import TextField, { TextFieldProps } from '@mui/material/TextField';

import clsx from 'clsx';

import './style.scss';

export type FilledInputProps = TextFieldProps;

export const FilledInput = ({
  label,
  error,
  className,
  ...rest
}: FilledInputProps) => {
  const classNames = {
    label: clsx('filled-input__label', error && 'filled-input__label-error'),
    input: clsx('filled-input', className),
  };

  return (
    <>
      <label className={classNames.label} htmlFor={'task-name'}>
        {label}
      </label>
      <TextField
        data-testid={'filled-input'}
        id={'task-name'}
        aria-autocomplete={'none'}
        autoComplete={'off'}
        className={classNames.input}
        variant={'filled'}
        color={'primary'}
        error={error}
        {...rest}
      />
    </>
  );
};
