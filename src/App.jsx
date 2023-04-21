import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

import useTheme from './hooks/useTheme';

import { Root, SignIn, SignUp } from './pages/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
  const [colorScheme, toggleColorScheme] = useTheme();

  return (
    <RecoilRoot>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ fontFamily: 'Spoqa Han Sans Neo, sans-serif', colorScheme }}
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS>
          <RouterProvider router={router} />
        </MantineProvider>
      </ColorSchemeProvider>
    </RecoilRoot>
  );
};

export default App;
