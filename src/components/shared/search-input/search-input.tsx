import SearchIcon from '@mui/icons-material/Search';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import clsx from 'clsx';

export const SearchInput = ({ className, ...rest }: TextFieldProps) => {
  const classNames = {
    input: clsx('search-input', className),
    icon: clsx('search-input__icon'),
  };

  return (
    <TextField
      InputProps={{
        endAdornment: <SearchIcon color={'action'} />,
      }}
      data-testid={'search-input'}
      id={'task-name'}
      aria-autocomplete={'none'}
      autoComplete={'off'}
      className={classNames.input}
      variant={'standard'}
      color={'primary'}
      size={'small'}
      label={'Search'}
      {...rest}
    />
  );
};
