import { AppDispatch, tasksActions } from '@/store';

const debounceDelay = 1000;

let timer: NodeJS.Timeout | null = null;

export const debouncedSearch = function (value: string, dispatch: AppDispatch) {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    dispatch(tasksActions.setSearch(value));
  }, debounceDelay);
};
