import Button, { ButtonProps } from '@mui/material/Button';

export const ButtonPrimary = ({ title, ...rest }: ButtonProps) => {
  return (
    <Button
      sx={{ fontWeight: 'bold' }}
      color={'primary'}
      size={'medium'}
      variant={'contained'}
      {...rest}
    >
      {title}
    </Button>
  );
};
