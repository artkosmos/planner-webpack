import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import clsx from 'clsx';

import './style.scss';

type Props = ComponentPropsWithoutRef<'input'> & {
  error?: string | null;
  label?: string;
  isDarkTheme?: boolean;
};

export const DateInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, error, label, isDarkTheme, ...rest } = props;

  const classNames = {
    datepicker: clsx(
      'datepicker',
      error && 'datepicker__error',
      className,
      isDarkTheme && 'datepicker_dark',
    ),
    label: clsx(
      'datepicker__label',
      error && 'datepicker__label-error',
      isDarkTheme && 'datepicker__label_dark',
    ),
  };

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
        min="0001-06-01T00:00"
        max="9999-06-30T00:00"
        step={'1'}
        data-testid={'date'}
        {...rest}
      />
    </>
  );
});
