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
      sx={{
        width: '100%',
        maxWidth: '700px',
        backgroundColor: '#d7e0ee',
        margin: '0 auto',
        fontSize: '20px',
        borderRadius: '15px',
        boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)',
      }}
    >
      <CardMUIContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </CardMUIContent>
    </CardMUI>
  );
};
