import { lazy, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import useColorScheme from './hooks/useColorScheme';
import AuthenticationGuard from './guard/AuthenticationGuard';
import { COLORS } from './constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const lazyLoadRoutes = componentName => {
  const LazyElement = lazy(() => import(`./pages/${componentName}.jsx`));

  return (
    <Suspense fallback="Loading...">
      <LazyElement />
    </Suspense>
  );
};

const router = createBrowserRouter([
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

const App = () => {
  const [colorScheme, toggleColorScheme] = useColorScheme();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{
              fontFamily: "'Spoqa Han Sans Neo', sans-serif",
              colorScheme,
              primaryColor: 'violet',
              colors: COLORS,
            }}
            withCSSVariables
            withGlobalStyles
            withNormalizeCSS>
            <ModalsProvider />
            <Notifications position="bottom-right" />
            <RouterProvider router={router} />
          </MantineProvider>
        </ColorSchemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
