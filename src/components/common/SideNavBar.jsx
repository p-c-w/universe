import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { Button, Group, Image, Navbar, Stack, Text, ThemeIcon, Transition, useMantineColorScheme } from '@mantine/core';
import { IconUser, IconMovie, IconThumbUp, IconHistory } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { userState, sideNavOpenedState, categoryState } from '../../recoil/atom';
import Signout from '../auth/Signout';

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
  height: 2.25rem;
  padding: 0.3125rem;
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
    label: 'My page',
    icon: <IconUser size="1.1rem" />,
  },
  { link: '/mypage', label: 'Watch now', icon: <IconMovie size="1.1rem" />, category: 'watch', color: 'yellow' },
  { link: '/mypage', label: 'Like', icon: <IconThumbUp size="1.1rem" />, category: 'like', color: 'red' },
  { link: '/mypage', label: 'History', icon: <IconHistory size="1.1rem" />, category: 'like', color: 'blue' },
];

const SideNavBar = () => {
  const user = useRecoilValue(userState);
  const isOpened = useRecoilValue(sideNavOpenedState);
  const { colorScheme } = useMantineColorScheme();
  const setCategory = useSetRecoilState(categoryState);

  const dark = colorScheme === 'dark';

  return (
    <Transition mounted={isOpened} transition="slide-right" duration={400} timingFunction="ease">
      {styles => (
        <Nav style={styles} p="lg" width={{ base: 240 }}>
          <Navbar.Section w={'100%'}>
            {user ? (
              <Stack spacing="md">
                {tabs.map(({ link, label, icon, color, category }) => (
                  <Tab key={label} role="button" aria-label="label" onClick={() => setCategory(category)}>
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
                <Text size="sm" fw={300}>
                  {'아직 나의'}
                </Text>
                <Text size="sm" fw={300}>
                  {parse('<b>유니버스</b>가 없나요?')}
                </Text>
                <Button component={Link} to={'/signin'} w="100%" my="sm" variant="gradient">
                  🚀Get Started !
                </Button>
              </>
            )}
          </Navbar.Section>
          <Stack>
            {user && (
              <Navbar.Section>
                <Signout />
              </Navbar.Section>
            )}
            <Section>
              <Stack spacing="sm" p="xs" align="center">
                <Group>
                  <Link to="https://github.com/p-c-w">
                    <Image
                      maw={40}
                      src={`/assets/logos/github-mark${dark ? '-white' : ''}.svg`}
                      w={20}
                      alt="github logo"
                    />
                  </Link>
                  <Link to="https://www.themoviedb.org/">
                    <Image maw={45} src="/assets/logos/tmdb_1x1.svg" w={20} alt="tmdb logo" />
                  </Link>
                </Group>
                <Text size={12} fw={300} align="center">
                  {'Copyright © 2023'}
                  <br />
                  {'Universe All rights reserved'}
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
