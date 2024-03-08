import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import clsx from 'clsx';

import './style.scss';

type Props = ComponentPropsWithoutRef<'input'> & {
  error?: string | null;
};

export const DateInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, error, ...rest } = props;

  const classNames = {
    datepicker: clsx('datepicker', error && 'datepicker__error', className),
    label: clsx('datepicker__label', error && 'datepicker__label-error'),
  };

  return (
    <>
      <label className={classNames.label} htmlFor={'date'}>
        {error || 'Date'}
      </label>
      <input
        className={classNames.datepicker}
        ref={ref}
        id={'date'}
        type="datetime-local"
        min="0001-06-01T00:00"
        max="9999-06-30T00:00"
        step={'1'}
        {...rest}
      />
    </>
  );
});
