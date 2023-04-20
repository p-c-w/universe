import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Root, MyPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
]);

const App = () => {
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = value => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <RecoilRoot>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ fontFamily: 'Spoqa Han Sans Neo', colorScheme }}
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
