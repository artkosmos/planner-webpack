import Button, { ButtonProps } from '@mui/material/Button';

export const ButtonPrimary = ({ title, children, ...rest }: ButtonProps) => {
  return (
    <Button
      data-testid={'primary-button'}
      sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
      color={'primary'}
      size={'medium'}
      variant={'contained'}
      {...rest}
    >
      <span style={{ marginRight: '7px' }}>{title}</span>
      {children}
    </Button>
  );
};
