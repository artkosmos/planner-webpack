import { type ReactNode } from 'react';
import DialogMUI from '@mui/material/Dialog';
import DialogMUIContent from '@mui/material/DialogContent';
import DialogMUITitle from '@mui/material/DialogTitle';

import clsx from 'clsx';

import { useAppSelector } from '@/store';

import './style.scss';

type Props = {
  children?: ReactNode;
  title?: string;
  isOpen: boolean;
  className?: string;
  onClose?: () => void;
};

export const Dialog = ({ ...rest }: Props) => {
  const { children, isOpen, title, onClose, className } = rest;

  const isDarkTheme = useAppSelector(state => state.main.darkTheme);

  const classNames = {
    title: clsx('dialog-mui-title', isDarkTheme && 'dialog-mui-title_dark'),
    content: clsx(
      'dialog-mui-content',
      isDarkTheme && 'dialog-mui-content_dark',
    ),
    dialog: clsx(className),
  };

  return (
    <DialogMUI
      data-testid={'dialog'}
      className={classNames.dialog}
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
      <DialogMUITitle className={classNames.title}>{title}</DialogMUITitle>
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
