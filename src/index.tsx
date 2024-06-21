import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from '@/app';
import { setupStore } from '@/store';

import './style/style.scss';
import './style/style.dark.scss';

import 'react-toastify/dist/ReactToastify.css';
import 'dayjs/locale/ru';
import './i18n.ts';

const rootElement = document.getElementById('root');
const container = createRoot(rootElement);

container.render(
  <Provider store={setupStore()}>
    <App />
  </Provider>,
);
