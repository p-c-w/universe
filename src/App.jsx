import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = value => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

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
