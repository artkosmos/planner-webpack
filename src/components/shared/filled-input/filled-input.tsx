import TextField, { TextFieldProps } from '@mui/material/TextField';

export const FilledInput = ({ label, ...rest }: TextFieldProps) => {
  return (
    <TextField
      aria-autocomplete={'none'}
      autoComplete={'off'}
      sx={{ backgroundColor: '#e5efff' }}
      label={label}
      variant={'filled'}
      color={'primary'}
      {...rest}
    />
  );
};
