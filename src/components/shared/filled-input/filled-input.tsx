import React from 'react';
import TextField, {TextFieldProps} from "@mui/material/TextField";

export const FilledInput = ({...rest}: TextFieldProps) => {
  return (
    <TextField
      aria-autocomplete={'none'}
      sx={{flex: '3', backgroundColor: '#e5efff'}}
      label={'List name'}
      variant={"filled"}
      color={"primary"}
      {...rest}
    />
  );
};
