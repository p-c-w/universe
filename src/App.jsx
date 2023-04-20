import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

import useTheme from './hooks/useTheme';

import Root from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);

const App = () => {
  const [colorScheme, toggleColorScheme] = useTheme();

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
