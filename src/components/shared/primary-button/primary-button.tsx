import React from 'react';
import Button, {ButtonProps} from '@mui/material/Button';

export const ButtonPrimary = ({title,...rest}: ButtonProps) => {
  return (
    <Button
      sx={{flex: '1', height: '56px', fontWeight: 'bold'}}
      color={"primary"}
      size={"medium"}
      variant={'contained'}
      {...rest}>
      {title}
    </Button>
  );
};
