import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, Group, Image, Navbar, Stack, Text, ThemeIcon, Transition, useMantineColorScheme } from '@mantine/core';
import { IconMovie, IconThumbUp, IconHistory, IconPlanet, IconLogout } from '@tabler/icons-react';
import parse from 'html-react-parser';
import { sideNavState, categoryState, isLoginState } from '../../../recoil/atom';
import { useSignout } from '../../../hooks';
import { PCW_REPO_URL, SIDE_NAV_DURATION, TMDB_URL } from '../../../constants';

const Nav = styled(Navbar)`
  justify-content: space-between;

  & .mantine-khtkeg {
    justify-content: space-between;
  }
`;

const Section = styled(Navbar.Section)`
  padding-top: 0.3125rem;
  border-top: ${({ theme }) => (theme.colorScheme === 'dark' ? '0.0625rem solid #2c2e33' : '0.0625rem solid #e9ecef')};
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  padding: 0.625rem;
  cursor: pointer;
  transition: 0.2s ease-in;
  border-radius: 0.3125rem;

  &:hover {
    background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[1])};
  }
`;

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[9])};
`;

const tabs = [
  {
    link: '/mypage',
    label: 'My Universe',
    icon: <IconPlanet size={16} />,
  },
  { link: '/mypage', label: 'Watch now', icon: <IconMovie size={16} />, category: 'watch', color: 'yellow' },
  { link: '/mypage', label: 'Like', icon: <IconThumbUp size={16} />, category: 'like', color: 'red' },
  { link: '/mypage', label: 'History', icon: <IconHistory size={16} />, category: 'history', color: 'blue' },
];

const SideNavBar = () => {
  const isLogin = useRecoilValue(isLoginState);
  const isOpened = useRecoilValue(sideNavState);
  const { colorScheme } = useMantineColorScheme();
  const setSelectedCategory = useSetRecoilState(categoryState);

  const signout = useSignout();

  const dark = colorScheme === 'dark';

  return (
    <Transition mounted={isOpened} transition="slide-right" duration={SIDE_NAV_DURATION} timingFunction="ease">
      {styles => (
        <Nav style={styles} p="md" width={{ base: 240 }}>
          <Navbar.Section w="100%">
            {isLogin ? (
              <Stack spacing={0}>
                {tabs.map(({ link, label, icon, color, category }) => (
                  <Tab
                    key={label}
                    role="button"
                    aria-label={label}
                    onClick={() => category && setSelectedCategory(category)}>
                    <CustomLink to={link}>
                      <ThemeIcon variant={dark ? 'filled' : 'light'} color={color}>
                        {icon}
                      </ThemeIcon>
                      <Text color={dark ? 'gray.0' : 'gray.9'} ml={25} size="sm">
                        {label}
                      </Text>
                    </CustomLink>
                  </Tab>
                ))}
              </Stack>
            ) : (
              <>
                <Text size="sm" color={dark ? 'gray.0' : 'gray.9'}>
                  아직 나의
                </Text>
                <Text size="sm" color={dark ? 'gray.0' : 'gray.9'}>
                  {parse('<b>유니버스</b>가 없나요?')}
                </Text>
                <Button
                  component={Link}
                  to={'/signin'}
                  w="100%"
                  my="sm"
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'blue', deg: 35 }}>
                  🚀Get Started !
                </Button>
              </>
            )}
          </Navbar.Section>
          <Stack>
            {isLogin && (
              <Navbar.Section>
                <Tab role="button" aria-label="Sign out" onClick={signout}>
                  <CustomLink to="/">
                    <ThemeIcon variant={dark ? 'filled' : 'light'} color="gray">
                      <IconLogout size="1.1rem" />
                    </ThemeIcon>
                    <Text color={dark ? 'gray.0' : 'gray.9'} ml={25} size="sm">
                      Sign out
                    </Text>
                  </CustomLink>
                </Tab>
              </Navbar.Section>
            )}
            <Section>
              <Stack spacing="sm" p="xs" align="center">
                <Group>
                  <Link to={PCW_REPO_URL}>
                    <Image
                      maw={40}
                      src={`/assets/logos/github-mark${dark ? '-white' : ''}.svg`}
                      w={20}
                      alt="github logo"
                    />
                  </Link>
                  <Link to={TMDB_URL}>
                    <Image maw={45} src="/assets/logos/tmdb_1x1.svg" w={20} alt="tmdb logo" />
                  </Link>
                </Group>
                <Text size={12} align="center">
                  Copyright © 2023
                  <br />
                  Universe All rights reserved
                </Text>
              </Stack>
            </Section>
          </Stack>
        </Nav>
      )}
    </Transition>
  );
};

export default SideNavBar;
