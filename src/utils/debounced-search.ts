import { debounce } from 'lodash';

import { appActions } from '@/api';
import { AppDispatch } from '@/store';

const debounceDelay = 1000;

export const debouncedSearch = debounce(
  (value: string, dispatch: AppDispatch) =>
    dispatch(appActions.setSearch(value)),
  debounceDelay,
);
