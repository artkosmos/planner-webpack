import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button, { ButtonProps } from '@mui/material/Button';

export const BackButton = ({ title, ...rest }: ButtonProps) => {
  return (
    <Button
      sx={{ height: 'minimal', display: 'flex', alignItems: 'center' }}
      color={'primary'}
      size={'large'}
      variant={'text'}
      startIcon={<ArrowBackIcon />}
      {...rest}
    >
      {title}
    </Button>
  );
};
