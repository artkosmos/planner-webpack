import React, { ComponentPropsWithoutRef } from 'react';
import './style.scss';
import clsx from 'clsx';

type Props = {
  title: string;
} & ComponentPropsWithoutRef<'p'>;

export const InfoTitle = ({ title, className, ...rest }: Props) => {
  const classNames = clsx('info-title', className);

  return (
    <p className={classNames} {...rest}>
      {title}
    </p>
  );
};
