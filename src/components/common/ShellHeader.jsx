import { useRecoilState, useRecoilValue } from 'recoil';
import { Avatar, Burger, Button, Flex, Header, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { sideNavOpenedState, userState } from '../../recoil/atom';
import { SearchBar, ThemeButton } from '.';

const generatInitial = email => `${email[0]}${email[1]}`;

const IconBox = styled(Avatar)`
  cursor: pointer;
`;

const ShellHeader = () => {
  const [isOpened, setIsOpend] = useRecoilState(sideNavOpenedState);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const user = useRecoilValue(userState);

  const dark = colorScheme === 'dark';
  const label = isOpened ? 'Close navigation' : 'Open navigation';

  return (
    <Header height={{ base: 50 }} p="md" zIndex="9999">
      <Flex align="Center" h="100%" justify="space-between">
        <Flex align="Center">
          <Burger
            opened={isOpened}
            onClick={() => setIsOpend(!isOpened)}
            size="sm"
            color={dark ? theme.colors.gray[0] : theme.colors.dark[8]}
            mr="xl"
            aria-label={label}
          />
          <Link to="/">
            <Avatar
              size="md"
              src={`./assets/logos/universe${dark ? 'LogoWhite' : 'LogoBlack'}.svg`}
              alt="home button"
            />
          </Link>
          <SearchBar />
        </Flex>
        <Flex align="Center">
          <ThemeButton />
          {user ? (
            <IconBox color="violet" size="md" variant="filled">
              {generatInitial(user)}
            </IconBox>
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
