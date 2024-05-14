import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import clsx from 'clsx';

import './style.scss';

type Props = ComponentPropsWithoutRef<'input'> & {
  error?: string | null;
  label?: string;
};

const ISO_8601_DATE_TIME_FORMAT = 16;

export const DateInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, error, label, ...rest } = props;

  const classNames = {
    datepicker: clsx('datepicker', error && 'datepicker__error', className),
    label: clsx('datepicker__label', error && 'datepicker__label-error'),
  };

  const today = new Date().toISOString().slice(0, ISO_8601_DATE_TIME_FORMAT);

  return (
    <>
      <label
        className={classNames.label}
        htmlFor={'date'}
        data-testid={'date-label'}
      >
        {error || label}
      </label>
      <input
        className={classNames.datepicker}
        lang={'ru'}
        ref={ref}
        id={'date'}
        type="datetime-local"
        min={today}
        max="9999-06-30T00:00"
        step={'1'}
        data-testid={'date'}
        {...rest}
      />
    </>
  );
});
