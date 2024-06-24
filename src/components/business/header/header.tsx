import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';

import clsx from 'clsx';

import { Select, type SelectItem } from '@/components/shared/select';
import { SwitchTheme } from '@/components/shared/switch-theme';
import { availableLanguages } from '@/constants/languages';
import { useDarkTheme } from '@/hooks/use-dark-theme';
import { tasksActions, useAppDispatch, useAppSelector } from '@/store';

import './style.scss';

export const Header = () => {
  const { t, i18n } = useTranslation('header');
  const dispatch = useAppDispatch();
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
  const { isDark, setIsDark } = useDarkTheme();
  const location = useLocation();

  useEffect(() => {
    const languageCodeLength = 2;
    const detectedLng = i18n.language.slice(0, languageCodeLength);
    const appInitLng = availableLanguages[detectedLng] || availableLanguages.en;
    i18n.changeLanguage(appInitLng);
  }, []);

  const isDarkTheme = useAppSelector(state => state.app.darkTheme);
  const sortBy = useAppSelector(state => state.tasks.listSort.sortBy);
  const filterBy = useAppSelector(state => state.tasks.listSort.filterBy);

  const languageItems: SelectItem[] = useMemo(() => {
    return [
      { value: 'en', label: t('en') },
      { value: 'ru', label: t('ru') },
    ];
  }, [t]);

  const sortItems: SelectItem[] = useMemo(() => {
    return [
      { value: '', label: `${t('table_sort.none')}` },
      { value: 'date_first', label: `${t('table_sort.date')} ↑` },
      { value: 'date_latest', label: `${t('table_sort.date')} ↓` },
      { value: 'name_a-z', label: `${t('table_sort.name')} ↑` },
      { value: 'name_z-a', label: `${t('table_sort.name')} ↓` },
    ];
  }, [t]);

  const filterItems: SelectItem[] = useMemo(() => {
    return [
      { value: '', label: `${t('table_filter.none')}` },
      { value: 'actual', label: `${t('table_filter.actual')}` },
      { value: 'expired', label: `${t('table_filter.expired')}` },
      { value: 'today', label: `${t('table_filter.today')}` },
      { value: 'done', label: `${t('table_filter.done')}` },
      { value: 'not_done', label: `${t('table_filter.not_done')}` },
      { value: 'important', label: `${t('table_filter.important')}` },
    ];
  }, [t]);

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDark(event.target.checked);
  };

  const handleLanguageSelect = (event: SelectChangeEvent) => {
    const selectValue = event.target.value;
    i18n.changeLanguage(selectValue);
  };

  const sortHandler = (event: SelectChangeEvent) => {
    const selectValue = event.target.value;
    dispatch(tasksActions.setSort(selectValue));
  };

  const filterHandler = (event: SelectChangeEvent) => {
    const selectValue = event.target.value;
    dispatch(tasksActions.setFilter(selectValue));
  };

  const classNames = useMemo(() => {
    return {
      header: clsx('header', isBurgerOpen && 'header_active'),
      title: clsx('header__title'),
      selectLanguage: clsx('header__lang-select'),
      selectSort: clsx('header__sort-select'),
      selectFilter: clsx('header__filter-select'),
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
      overlay: clsx(
        'header__overlay',
        isBurgerOpen && 'header__overlay_active',
      ),
    };
  }, [isDarkTheme, isBurgerOpen]);

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
          <Select
            items={filterItems}
            label={t('filter_select_label')}
            className={classNames.selectFilter}
            onChange={filterHandler}
            value={filterBy}
          />
          <Select
            items={sortItems}
            label={t('sort_select_label')}
            className={classNames.selectSort}
            onChange={sortHandler}
            value={sortBy}
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
          value={i18n.language}
        />
      </div>
    </header>
  );
};
