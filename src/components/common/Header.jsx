import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { Burger, Button, useMantineColorScheme } from '@mantine/core';
import sideNavOpenedState from '../../recoil/atom/sideNavOpenedState';
import { SearchBar } from '.';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.875rem;
  width: 100%;
  top: 0;
`;

const BugerButton = styled(Burger)`
  margin: 0 1.875rem;
`;

const LogoContainer = styled.button`
  width: 3.75rem;
  height: 3.75rem;
  border: none;
  background-color: transparent;
`;

const SignInButton = styled(Button)`
  margin: 0 1.875rem;
`;

const Header = () => {
  const [opened, setOpened] = useRecoilState(sideNavOpenedState);
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const label = opened ? 'Close navigation' : 'Open navigation';

  return (
    <Container>
      <BugerButton opened={opened} onClick={opened => setOpened(!opened)} aria-label={label} />
      <LogoContainer>
        <img src={`./assets/logos/universe${dark ? 'LogoWhite' : 'LogoBlack'}.svg`} alt="home button" />
      </LogoContainer>
      <SearchBar />
      <SignInButton variant="outline" color={dark ? 'gray' : 'dark'} height={20}>
        Sign in
      </SignInButton>
    </Container>
  );
};

export default Header;
