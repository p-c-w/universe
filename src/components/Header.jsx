import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';

import { Burger, Button, useMantineColorScheme } from '@mantine/core';
import isSideNavOpenState from '../recoil/atom/isSideNavOpenState';

import SearchBar from './SearchBar';

const Container = styled.div`
  position: fixed;
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

const Logo = styled.button`
  width: 3.75rem;
  height: 3.75rem;
  border: none;
  background-color: transparent;
`;

const SignInButton = styled(Button)`
  margin: 0 1.875rem;
`;

const Header = () => {
  const [isOpened, setIsOpend] = useRecoilState(isSideNavOpenState);
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const label = isOpened ? 'Close navigation' : 'Open navigation';

  return (
    <Container>
      <BugerButton opened={isOpened} onClick={() => setIsOpend(!isOpened)} aria-label={label} />
      <Logo>
        <img src={`./assets/logos/universe${dark ? 'LogoWhite' : 'LogoBlack'}.svg`} alt="home button" />
      </Logo>
      <SearchBar />
      <SignInButton variant="outline" color={dark ? 'gray' : 'dark'}>
        Sign in
      </SignInButton>
    </Container>
  );
};

export default Header;
