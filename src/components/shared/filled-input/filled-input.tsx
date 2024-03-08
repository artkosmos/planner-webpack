import TextField, { TextFieldProps } from '@mui/material/TextField';

import clsx from 'clsx';

import './style.scss';

export const FilledInput = ({ label, error, ...rest }: TextFieldProps) => {
  const labelClassName = clsx(
    'filled-input__label',
    error && 'filled-input__label-error',
  );

  return (
    <>
      <label className={labelClassName} htmlFor={'task-name'}>
        {label}
      </label>
      <TextField
        id={'task-name'}
        aria-autocomplete={'none'}
        autoComplete={'off'}
        className={'filled-input'}
        sx={{
          backgroundColor: '#e5efff',
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
