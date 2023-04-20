import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);

const App = () => {
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = value => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <RecoilRoot>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <RouterProvider router={router} />
        </MantineProvider>
      </ColorSchemeProvider>
    </RecoilRoot>
  );
};

export default App;
