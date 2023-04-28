import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';

import { Navbar, Transition } from '@mantine/core';
import { IconUser, IconMovie, IconThumbUp, IconHistory } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import sideNavOpenedState from '../../recoil/atom/sideNavOpenedState';
import Signout from '../auth/Signout';

const Container = styled(Navbar)`
  justify-content: space-between;
`;

const TabList = styled.ul`
  padding: 0;
  margin: 0;
`;

const Tab = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  height: 2.25rem;
  margin: 0 0 0.9375rem 0;
  padding: 0.3125rem;
  cursor: pointer;
  transition: 0.2s ease-in;
  border-radius: 0.3125rem;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colorScheme === 'dark' ? theme.colors[theme.primaryColor][7] : theme.colors.gray[0]};
  }
`;

const LogoutTab = styled(Tab)`
  margin: 0;
`;

const MypageLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
`;

const Title = styled.span`
  width: 116px;
  margin-left: 1.875rem;
  font-size: var(--mantine-font-size-sm);
`;

const tabs = [
  {
    link: '/mypage',
    label: 'MY PAGE',
    icon: <IconUser />,
  },
  { link: '/mypage', label: 'COMMING UP', icon: <IconMovie /> },
  { link: '/mypage', label: 'LIKE', icon: <IconThumbUp /> },
  { link: '/mypage', label: 'HISTORY', icon: <IconHistory /> },
];

const SideNavBar = () => {
  const isOpened = useRecoilValue(sideNavOpenedState);

  return (
    <Transition mounted={isOpened} transition="skew-up" duration={400} timingFunction="ease">
      {styles => (
        <Container style={styles} p="sm" width={{ base: 240 }}>
          <TabList>
            {tabs.map(({ link, label, icon }) => (
              <Tab key={label} role="button">
                <MypageLink to={link}>
                  {icon}
                  <Title>{label}</Title>
                </MypageLink>
              </Tab>
            ))}
          </TabList>
          <LogoutTab>
            <Signout styleProps={styles} titleSize="116px" fontSize={'sm'} />
          </LogoutTab>
        </Container>
      )}
    </Transition>
  );
};

export default SideNavBar;
