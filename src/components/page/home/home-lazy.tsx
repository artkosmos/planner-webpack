import { lazy } from 'react';

export const HomeLazy = lazy(
  () => import(/* webpackChunkName: "home" */ './home'),
);
