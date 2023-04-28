import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useColorScheme from './hooks/useColorScheme';
import { Root, MyPage, SignIn, SignUp } from './pages';
import AuthenticationGuard from './guard/AuthenticationGuard';

const queryClient = new QueryClient({
  retry: 3,
});

const router = createBrowserRouter([
  {
    path: '/mypage',
    element: <AuthenticationGuard redirectTo="/signin" element={<MyPage />} />,
  },
  {
    path: '/',
    element: <Root />,
  },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/mypage', element: <MyPage /> },
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
