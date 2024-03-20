import { ComponentPropsWithoutRef } from 'react';

import clsx from 'clsx';

import './style.scss';

type Props = {
  title: string;
} & ComponentPropsWithoutRef<'p'>;

export const InfoTitle = ({ title, className, ...rest }: Props) => {
  const classNames = clsx('info-title', className);

  return (
    <p data-testid={'info-title'} className={classNames} {...rest}>
      {title}
    </p>
  );
};
