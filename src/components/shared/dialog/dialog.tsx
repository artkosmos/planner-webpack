import { type ReactNode } from 'react';
import DialogMUI, { DialogProps } from '@mui/material/Dialog';
import DialogMUIContent from '@mui/material/DialogContent';
import DialogMUITitle from '@mui/material/DialogTitle';

import clsx from 'clsx';

import './style.scss';

type Props = {
  children?: ReactNode;
  title?: string;
  isOpen: boolean;
  className?: string;
  onClose?: () => void;
  maxWidth?: DialogProps['maxWidth'];
};

export const Dialog = ({ ...rest }: Props) => {
  const { children, isOpen, title, onClose, maxWidth = 'sm', className } = rest;

  const classNames = {
    title: clsx('dialog-mui-title'),
    content: clsx('dialog-mui-content'),
    dialog: clsx(className),
  };

  return (
    <DialogMUI
      data-testid={'dialog'}
      className={classNames.dialog}
      maxWidth={maxWidth}
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
      {title && (
        <DialogMUITitle className={classNames.title}>{title}</DialogMUITitle>
      )}
      <DialogMUIContent
        className={classNames.content}
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
