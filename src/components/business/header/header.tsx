import { ChangeEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import clsx from 'clsx';

import { appActions } from '@/api';
import { Select, type SelectItem } from '@/components/shared/select';
import { SwitchTheme } from '@/components/shared/switch-theme';
import { AppDispatch, useAppSelector } from '@/store';
import { useDarkTheme } from '@/utils';

import './style.scss';

export const Header = () => {
  const { t, i18n } = useTranslation('header');
  const dispatch = useDispatch<AppDispatch>();

  const { isDark, setIsDark } = useDarkTheme();

  const items: SelectItem[] = useMemo(() => {
    return [
      { value: 'en', label: t('en') },
      { value: 'ru', label: t('ru') },
    ];
  }, [t]);

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDark(event.target.checked);
    localStorage.setItem('darkTheme', `${event.target.checked}`);
    dispatch(appActions.changeAppTheme(event.target.checked));
  };

  const isDarkTheme = useAppSelector(state => state.main.darkTheme);

  const classNames = {
    header: clsx('header', isDarkTheme && 'header_dark'),
    title: clsx('header__title', isDarkTheme && 'header__title_dark'),
  };

  return (
    <header className={classNames.header} data-testid={'header'}>
      <span className={classNames.title}>{t('app_name')} 🤪</span>
      <div className={'header__settings'}>
        <SwitchTheme checked={isDark} onChange={handleSwitchChange} />
        <Select
          className={'header__select'}
          label={t('select_label')}
          items={items}
          onChange={event => i18n.changeLanguage(event.target.value as string)}
          value={i18n.language}
          darkTheme={isDarkTheme}
        />
      </div>
    </header>
  );
};
