import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import {HOME, TASK} from "./constants";

const LazyHome = lazy(() => import('@/components/page/home/home'));
const LazyTaskDescription = lazy(() => import('@/components/page/task-description/task-description'));

export const router = createBrowserRouter([
  {
    path: HOME,
    element: <Suspense fallback={'Loading...'}><LazyHome/></Suspense>
  },
  {
    path: `${TASK}/:id`,
    element: <Suspense fallback={'Loading...'}><LazyTaskDescription/></Suspense>
  }
])
