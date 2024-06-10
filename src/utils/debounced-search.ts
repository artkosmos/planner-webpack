import { debounce } from 'lodash';

import { AppDispatch, tasksActions } from '@/store';

const debounceDelay = 1000;

export const debouncedSearch = debounce(
  (value: string, dispatch: AppDispatch) =>
    dispatch(tasksActions.setSearch(value)),
  debounceDelay,
);
