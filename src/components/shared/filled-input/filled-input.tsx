import TextField, { TextFieldProps } from '@mui/material/TextField';

import clsx from 'clsx';

import './style.scss';

export type FilledInputProps = { darkTheme?: boolean } & TextFieldProps;

export const FilledInput = ({
  label,
  error,
  darkTheme,
  className,
  ...rest
}: FilledInputProps) => {
  const classNames = {
    label: clsx(
      'filled-input__label',
      error && 'filled-input__label-error',
      darkTheme && 'filled-input__label_dark',
    ),
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
        sx={{
          backgroundColor: darkTheme ? '#F5F5F57F' : '#e5efff',
          '.MuiFilledInput-input': {
            padding: '15px 10px',
          },
        }}
        variant={'filled'}
        color={'primary'}
        error={error}
        {...rest}
      />
    </>
  );
};
