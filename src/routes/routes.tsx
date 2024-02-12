import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

const LazyHome = lazy(() => import('@/components/page/home/home'));
const LazyTaskDescription = lazy(() => import('@/components/page/task-description/task-description'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={'Loading...'}><LazyHome/></Suspense>
  },
  {
    path: 'task/:id',
    element: <Suspense fallback={'Loading...'}><LazyTaskDescription/></Suspense>
  }
])
