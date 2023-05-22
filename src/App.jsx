import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import useColorScheme from './hooks/useColorScheme';
import { COLORS } from './constants';
import routerConfig from './router/routerConfig';
import GlobalFonts from './styles/GlobalFonts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const App = () => {
  const [colorScheme, toggleColorScheme] = useColorScheme();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{
              globalStyles: theme => ({
                '*, *::before, *::after': {
                  boxSizing: 'border-box',
                },
                title: {
                  color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
                text: {
                  color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
              }),
              fontFamily: 'Spoqa Han Sans Neo, sans-serif',
              colorScheme,
              primaryColor: 'violet',
              colors: COLORS,
            }}
            withCSSVariables
            withGlobalStyles
            withNormalizeCSS>
            <GlobalFonts />
            <ModalsProvider />
            <Notifications position="bottom-right" />
            <RouterProvider router={routerConfig} />
          </MantineProvider>
        </ColorSchemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
