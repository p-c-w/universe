import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useColorScheme from './hooks/useColorScheme';

import { Root, MyPage, SignIn } from './pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 1000 * 60 * 5,
      retry: 3,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

const App = () => {
  const [colorScheme, toggleColorScheme] = useColorScheme();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{ fontFamily: 'Spoqa Han Sans Neo, sans-serif', colorScheme, primaryColor: 'violet' }}
            withCSSVariables
            withGlobalStyles
            withNormalizeCSS>
            <RouterProvider router={router} />
          </MantineProvider>
        </ColorSchemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
