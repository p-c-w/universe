import { AppShell } from '@mantine/core';
import styled from '@emotion/styled';
import { SideNavBar, ShellHeader } from '.';

const Layout = styled(AppShell)`
  & .main {
    background: ${({ theme }) => (theme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0])};
  }
`;

const GlobalShell = ({ children }) => (
  <Layout navbar={<SideNavBar />} header={<ShellHeader />}>
    {children}
  </Layout>
);

export default GlobalShell;
