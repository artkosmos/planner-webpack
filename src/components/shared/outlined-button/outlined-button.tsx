import React from 'react';
import Button, {ButtonProps} from '@mui/material/Button';

export const ButtonOutlined = ({title,...rest}: ButtonProps) => {
  return (
    <Button
      sx={{fontWeight: 'bold'}}
      color={"error"}
      size={"medium"}
      variant={'outlined'}
      {...rest}>
      {title}
    </Button>
  );
};
