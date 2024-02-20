import React from 'react';
import TextField, {TextFieldProps} from "@mui/material/TextField";

export const FilledInput = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({label, ...rest}, ref) => {
    return (
      <TextField
        aria-autocomplete={'none'}
        autoComplete={'off'}
        sx={{backgroundColor: '#e5efff'}}
        label={label}
        variant={"filled"}
        color={"primary"}
        ref={ref}
        {...rest}
      />
    );
  }
);

