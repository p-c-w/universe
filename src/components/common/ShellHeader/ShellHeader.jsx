import { useRecoilState, useRecoilValue } from 'recoil';
import { Avatar, Burger, Button, Flex, Header, Title, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { isLoginState, sideNavState, userState } from '../../../recoil/atom';
import { MyMenu, SearchBar } from '.';
import { ThemeButton } from '..';
import { generateInitial } from '../../../utils';

const Logo = styled(Avatar)`
  cursor: pointer;
  transition: 0.1s ease;
  padding: 0.0625rem;

  &:hover {
    padding: 0;
  }
`;

const ShellHeader = () => {
  const [isOpened, setIsOpened] = useRecoilState(sideNavState);
  const { colorScheme } = useMantineColorScheme();
  const isLogin = useRecoilValue(isLoginState);
  const user = useRecoilValue(userState);

  const dark = colorScheme === 'dark';
  const label = isOpened ? 'Close navigation' : 'Open navigation';

  const handleBurgerClick = () => setIsOpened(prev => !prev);

  return (
    <Header height={{ base: 60 }} miw={768} p="xl" zIndex="9999">
      <Flex align="center" h="100%" justify="space-between">
        <Flex align="center">
          <Burger
            opened={isOpened}
            onClick={handleBurgerClick}
            size="md"
            c={dark ? 'gray.0' : 'dark.8'}
            mr="lg"
            aria-label={label}
          />
          <Link to="/">
            <Logo size={40} src={`./assets/logos/universe${dark ? 'LogoWhite' : 'LogoBlack'}.svg`} alt="home button" />
          </Link>
          <Flex h={40} align="end">
            <Title size={14} fw="100" italic>
              Beta
            </Title>
          </Flex>
        </Flex>
        <SearchBar />
        <Flex mx="0" align="Center" gap="xs">
          <ThemeButton />
          {isLogin ? (
            <MyMenu initial={user && generateInitial(user)} />
          ) : (
            <Button component={Link} to="/signin" variant="filled" color={dark ? 'violet' : 'dark'}>
              Sign in
            </Button>
          )}
        </Flex>
      </Flex>
    </Header>
  );
};

export default ShellHeader;
