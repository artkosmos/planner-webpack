import React, {type ReactNode} from 'react';
import CardMUIContent from "@mui/material/CardContent";
import CardMUI from "@mui/material/Card";

type Props = {
  children?: ReactNode
  className?: string
}

export const Card = ({children, className}: Props) => {
  return (
    <CardMUI
      className={className}
      sx={{
        width: '100%',
        maxWidth: '700px',
        backgroundColor: '#d7e0ee',
        margin: '0 auto',
        fontSize: '20px'
      }}>
      <CardMUIContent>
        {children}
      </CardMUIContent>
    </CardMUI>
  );
};