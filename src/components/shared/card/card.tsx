import { type ReactNode } from 'react';
import CardMUI from '@mui/material/Card';
import CardMUIContent from '@mui/material/CardContent';

type Props = {
  children?: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: Props) => {
  return (
    <CardMUI
      className={className}
      data-testid={'card'}
      sx={{
        borderRadius: '10px',
        boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)',
      }}
    >
      <CardMUIContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '17px',
          '&:last-child': {
            paddingBottom: '17px',
          },
        }}
      >
        {children}
      </CardMUIContent>
    </CardMUI>
  );
};
