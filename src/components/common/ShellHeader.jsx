import { useRecoilState, useRecoilValue } from 'recoil';
import { Avatar, Burger, Button, Flex, Header, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { sideNavOpenedState, userState } from '../../recoil/atom';
import { MyMenu, SearchBar, ThemeButton } from '.';
import { generateInitial } from '../../utils';

const Logo = styled(Avatar)`
  cursor: pointer;
  transition: 0.1s ease;
  padding: 0.0625rem;

  &:hover {
    padding: 0;
  }
`;

const ShellHeader = () => {
  const [isOpened, setIsOpened] = useRecoilState(sideNavOpenedState);
  const { colorScheme } = useMantineColorScheme();
  const user = useRecoilValue(userState);
  const theme = useMantineTheme();

  const dark = colorScheme === 'dark';
  const label = isOpened ? 'Close navigation' : 'Open navigation';

  const handleBurgerClick = () => setIsOpened(!isOpened);

  return (
    <Header height={{ base: 60 }} p="xl" zIndex="9999">
      <Flex align="center" h="100%" justify="space-between">
        <Flex align="center">
          <Burger
            opened={isOpened}
            onClick={handleBurgerClick}
            size="md"
            color={dark ? theme.colors.gray[0] : theme.colors.dark[8]}
            mr="lg"
            aria-label={label}
          />
          <Link to="/">
            <Logo size={40} src={`./assets/logos/universe${dark ? 'LogoWhite' : 'LogoBlack'}.svg`} alt="home button" />
          </Link>
          <Flex h={40} align="end">
            <Title size={14} fw={100} italic>
              Beta
            </Title>
          </Flex>
          <SearchBar />
        </Flex>
        <Flex align="Center">
          <ThemeButton />
          {user ? (
            <MyMenu initial={generateInitial(user)} />
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
