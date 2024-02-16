import React, {type ReactNode} from 'react';
import DialogMUI from "@mui/material/Dialog";
import DialogMUIContent from "@mui/material/DialogContent";
import DialogMUITitle from "@mui/material/DialogTitle";
import './style.scss'

type Props = {
  children?: ReactNode,
  title: string,
  isOpen: boolean,
  cancelButtonName?: string
  confirmButtonName?: string
  className?: string
  oneButton?: boolean
  setIsOpen?: any
}

export const Dialog = ({...rest}: Props) => {
  const {
    children,
    isOpen,
    title,
    setIsOpen,
    className
  } = rest

  return (
    <DialogMUI
      className={className}
      maxWidth={"sm"}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      fullWidth
      sx={{
        '.MuiPaper-root': {borderRadius: '10px'}
      }}
    >
      <DialogMUITitle
        className={'dialogMUI-title'}
        sx={{
          borderBottom: '1px solid #ddd',
          fontWeight: 'bold',
          fontSize: '22px'
      }}>
        {title}
      </DialogMUITitle>
      <DialogMUIContent
        className={'dialogMUI-content'}
        sx={{
          paddingTop: '20px !important',
          display: 'flex',
          flexDirection: 'column',
        }}>
        {children}
      </DialogMUIContent>
    </DialogMUI>
  );
};