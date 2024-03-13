import { type ReactNode } from 'react';
import DialogMUI from '@mui/material/Dialog';
import DialogMUIContent from '@mui/material/DialogContent';
import DialogMUITitle from '@mui/material/DialogTitle';

import './style.scss';

type Props = {
  children?: ReactNode;
  title: string;
  isOpen: boolean;
  className?: string;
  onClose?: () => void;
};

export const Dialog = ({ ...rest }: Props) => {
  const { children, isOpen, title, onClose, className } = rest;

  return (
    <DialogMUI
      className={className}
      maxWidth={'sm'}
      open={isOpen}
      onClose={onClose}
      fullWidth
      sx={{
        '.MuiPaper-root': {
          borderRadius: '10px',
          overflow: 'visible',
        },
      }}
    >
      <DialogMUITitle
        className={'dialog-mui-title'}
        sx={{
          borderBottom: '1px solid #ddd',
          fontWeight: 'bold',
          fontSize: '22px',
        }}
      >
        {title}
      </DialogMUITitle>
      <DialogMUIContent
        className={'dialog-mui-content'}
        sx={{
          paddingTop: '20px !important',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </DialogMUIContent>
    </DialogMUI>
  );
};
