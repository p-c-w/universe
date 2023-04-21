import { useDisclosure } from '@mantine/hooks';
import { Burger, Button, useMantineColorScheme } from '@mantine/core';
import styled from '@emotion/styled';
import SearchBar from './SearchBar';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.875rem;
  margin: 0 auto;
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
  const [opened, { toggle }] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const label = opened ? 'Close navigation' : 'Open navigation';

  return (
    <Container>
      <BugerButton opened={opened} onClick={toggle} aria-label={label} />
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
