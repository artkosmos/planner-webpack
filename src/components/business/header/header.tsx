import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';

import clsx from 'clsx';

import { appActions } from '@/api';
import { TAvailableLanguages } from '@/common/types';
import { SearchInput } from '@/components/shared/search-input';
import { Select, type SelectItem } from '@/components/shared/select';
import { SwitchTheme } from '@/components/shared/switch-theme';
import { languages } from '@/constants/languages';
import { useAppDispatch, useAppSelector } from '@/store';
import { debouncedSearch } from '@/utils/debounced-search';
import { useDarkTheme } from '@/utils/use-dark-theme';

import './style.scss';

export const Header = () => {
  const { t, i18n } = useTranslation('header');
  const dispatch = useAppDispatch();
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
  const { isDark, setIsDark } = useDarkTheme();
  const location = useLocation();

  useEffect(() => {
    const initLanguage: TAvailableLanguages =
      languages.find(lang => lang === i18n.language) || 'en';
    dispatch(appActions.setLanguage(initLanguage));
  }, []);

  const isDarkTheme = useAppSelector(state => state.main.darkTheme);
  const sortBy = useAppSelector(state => state.main.sortBy);
  const currentLanguage = useAppSelector(state => state.main.language);

  const languageItems: SelectItem[] = useMemo(() => {
    return [
      { value: 'en', label: t('en') },
      { value: 'ru', label: t('ru') },
    ];
  }, [t]);

  const sortItems: SelectItem[] = useMemo(() => {
    return [
      { value: '', label: `${t('table_sort.none')}` },
      { value: 'date_first ', label: `${t('table_sort.date')} ↑` },
      { value: 'date_latest', label: `${t('table_sort.date')} ↓` },
      { value: 'name_a-z', label: `${t('table_sort.name')} ↑` },
      { value: 'name_z-a', label: `${t('table_sort.name')} ↓` },
      { value: 'importance', label: `${t('table_sort.important')}` },
    ];
  }, [t]);

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDark(event.target.checked);
    localStorage.setItem('darkTheme', `${event.target.checked}`);
    dispatch(appActions.changeAppTheme(event.target.checked));
  };

  const handleLanguageSelect = (event: SelectChangeEvent) => {
    const selectValue = event.target.value as TAvailableLanguages;
    dispatch(appActions.setLanguage(selectValue));
    i18n.changeLanguage(selectValue);
  };

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    debouncedSearch(inputValue, dispatch);
  };

  const sortHandler = (event: SelectChangeEvent) => {
    const selectValue = event.target.value;
    dispatch(appActions.setSort(selectValue));
  };

  const classNames = {
    header: clsx(
      'header',
      isDarkTheme && 'header_dark',
      isBurgerOpen && 'header_active',
    ),
    title: clsx('header__title', isDarkTheme && 'header__title_dark'),
    selectLanguage: clsx('header__lang-select'),
    selectSort: clsx('header__sort-select'),
    burger: clsx(
      'header__burger',
      isBurgerOpen && 'header__burger_active',
      isDarkTheme && 'header__burger_dark',
    ),
    burgerList: clsx(
      'header__burger-list',
      isBurgerOpen && 'header__burger-list_active',
      isDarkTheme && 'header__burger-list_dark',
    ),
    overlay: clsx('header__overlay', isBurgerOpen && 'header__overlay_active'),
  };

  return (
    <header className={classNames.header} data-testid={'header'}>
      <span className={classNames.title}>{t('app_name')} 🤪</span>
      <div
        className={classNames.burger}
        onClick={() => setIsBurgerOpen(!isBurgerOpen)}
      >
        <span></span>
      </div>
      <div className={classNames.burgerList}></div>
      <div className={classNames.overlay}></div>
      {location.pathname === '/' && (
        <div className={'header__table-sort'}>
          <SearchInput
            label={t('search_placeholder')}
            className={'header__search'}
            onChange={searchHandler}
          />
          <Select
            items={sortItems}
            label={t('sort_select_label')}
            className={classNames.selectSort}
            onChange={sortHandler}
            value={sortBy}
            data-testid={'select-sort'}
          />
        </div>
      )}
      <div className={'header__settings'}>
        <SwitchTheme checked={isDark} onChange={handleSwitchChange} />
        <Select
          className={classNames.selectLanguage}
          label={t('select_label')}
          items={languageItems}
          onChange={handleLanguageSelect}
          value={currentLanguage}
          data-testid={'select-lang'}
        />
      </div>
    </header>
  );
};
