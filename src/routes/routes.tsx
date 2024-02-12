import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

const Home = lazy(() => import('@/components/page/home/home'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={'Loading...'}><Home/></Suspense>
  }
])
