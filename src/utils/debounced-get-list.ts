import { debounce } from 'lodash';

import { mainThunk } from '@/api';
import { AppDispatch } from '@/store';

const debounceDelay = 1000;

export const debouncedGetList = debounce(
  (substr: string, dispatch: AppDispatch) =>
    dispatch(mainThunk.getTaskList(substr)),
  debounceDelay,
);
