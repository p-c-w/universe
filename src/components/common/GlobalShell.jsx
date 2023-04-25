import { useRecoilState } from 'recoil';
import { AppShell, Header, Container, Button, Burger, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import styled from '@emotion/styled';
import isSideNavOpenState from '../../recoil/atom/sideNavOpenedState';
import SearchBar from './SearchBar';
import SideNavBar from './SideNavBar';

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Logo = styled.button`
  width: 3.125rem;
  border: none;
  background-color: transparent;
`;

const GlobalShell = ({ children }) => {
  const theme = useMantineTheme();
  const [isOpened, setIsOpend] = useRecoilState(isSideNavOpenState);
  const { colorScheme } = useMantineColorScheme();

  const dark = colorScheme === 'dark';
  const label = isOpened ? 'Close navigation' : 'Open navigation';

  return (
    <AppShell
      styles={{
        main: {
          background: dark ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbar={<SideNavBar />}
      header={
        <Header height={{ base: 50 }} p="md">
          <SubContainer>
            <Burger
              opened={isOpened}
              onClick={() => setIsOpend(!isOpened)}
              size="sm"
              color={dark ? theme.colors.gray[0] : theme.colors.dark[8]}
              mr="xl"
              aria-label={label}
            />
            <Logo>
              <img src={`./assets/logos/universe${dark ? 'LogoWhite' : 'LogoBlack'}.svg`} alt="home button" />
            </Logo>
            <Container size={34} />
            <SearchBar />
            <Button variant={'outline'} color={dark ? 'violet' : 'dark'}>
              Sign in
            </Button>
          </SubContainer>
        </Header>
      }>
      {children}
    </AppShell>
  );
};

export default GlobalShell;
