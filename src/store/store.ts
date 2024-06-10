import { useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { appReducer } from '@/store/app-slice';
import { tasksReducer } from '@/store/task-slice';

const rootReducer = combineReducers({
  app: appReducer,
  tasks: tasksReducer,
});

export const setupStore = (
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
