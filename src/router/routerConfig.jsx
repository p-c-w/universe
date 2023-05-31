import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthenticationGuard from '../guard/AuthenticationGuard';
import { PageLoader } from '../loaders';

const lazyLoadRoutes = componentName => {
  const LazyElement = lazy(() => import(`../pages/${componentName}.jsx`));

  return (
    <Suspense fallback={<PageLoader />}>
      <LazyElement />
    </Suspense>
  );
};

const routerConfig = createBrowserRouter([
  {
    path: '/mypage',
    element: <AuthenticationGuard redirectTo="/signin" element={lazyLoadRoutes('MyPage')} />,
  },
  {
    path: '/',
    element: lazyLoadRoutes('Root'),
  },
  {
    path: '/editprofile',
    element: <AuthenticationGuard redirectTo="/signin" element={lazyLoadRoutes('EditProfile')} />,
  },
  { path: '/signin', element: lazyLoadRoutes('SignIn') },
  { path: '/signup', element: lazyLoadRoutes('SignUp') },
]);

export default routerConfig;
