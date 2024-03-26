import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import header from '../../public/locales/en/header.json';
import home from '../../public/locales/en/home.json';
import task from '../../public/locales/en/task.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      home,
      task,
      header,
    },
  },
});

export default i18n;
