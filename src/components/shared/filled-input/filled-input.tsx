import TextField, { TextFieldProps } from '@mui/material/TextField';

import clsx from 'clsx';

import { useAppSelector } from '@/store';

import './style.scss';

export type FilledInputProps = TextFieldProps;

export const FilledInput = ({
  label,
  error,
  className,
  ...rest
}: FilledInputProps) => {
  const isDarkTheme = useAppSelector(state => state.main.darkTheme);

  const classNames = {
    label: clsx(
      'filled-input__label',
      error && 'filled-input__label-error',
      isDarkTheme && 'filled-input__label_dark',
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
          backgroundColor: isDarkTheme ? '#F5F5F57F' : '#e5efff',
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
