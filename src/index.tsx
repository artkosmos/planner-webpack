import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes';
import { setupStore } from '@/store';

import './style/style.scss';
import './style/style.dark.scss';

import 'dayjs/locale/ru';
import './i18n.ts';

const rootElement = document.getElementById('root');
const container = createRoot(rootElement);

container.render(
  <Provider store={setupStore()}>
    <RouterProvider router={router} />
  </Provider>,
);
