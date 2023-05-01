import { useRecoilState, useRecoilValue } from 'recoil';
import { Avatar, Burger, Button, Flex, Header, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { isLoginState, sideNavOpenedState, userState } from '../../recoil/atom';
import { SearchBar, ThemeButton } from '.';

const generatInitial = email => `${email[0]}${email[1]}`;

const IconBox = styled(Avatar)`
  cursor: pointer;
`;

const ShellHeader = () => {
  const [isOpened, setIsOpend] = useRecoilState(sideNavOpenedState);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const email = useRecoilValue(userState);
  const isLogin = useRecoilValue(isLoginState);

  const dark = colorScheme === 'dark';
  const label = isOpened ? 'Close navigation' : 'Open navigation';

  return (
    <Header height={{ base: 50 }} p="md">
      <Flex align="Center" h="100%">
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
        </Flex>
        <SearchBar />
        <ThemeButton />
        {isLogin ? (
          <IconBox color="violet" size="md" variant="filled">
            {generatInitial(email)}
          </IconBox>
        ) : (
          <Button component={Link} to="/signin" variant="filled" color={dark ? 'violet' : 'dark'}>
            Sign in
          </Button>
        )}
      </Flex>
    </Header>
  );
};

export default ShellHeader;
