import { useRecoilValue } from 'recoil';
import { Transition } from '@mantine/core';
import styled from '@emotion/styled';

import { IconUser, IconMovie, IconThumbUp, IconHistory, IconLogout } from '@tabler/icons-react';

import isSideNavOpenState from '../recoil/atom/isSideNavOpenState';

const Container = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 4.875rem - 1.875rem);
`;

const ListContainer = styled.ul`
  padding: 0;
`;

const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  height: 2.25rem;
  margin: 1.25rem 1.875rem;
  padding: 5px;
  cursor: pointer;
`;

const Title = styled.span`
  width: 116px;
  margin-left: 1.875rem;
`;

const Menus = [
  {
    title: 'MY PAGE',
    icon: <IconUser />,
  },
  { title: 'COMMING UP', icon: <IconMovie /> },
  { title: 'LIKE', icon: <IconThumbUp /> },
  { title: 'HISTORY', icon: <IconHistory /> },
];

const SideNavBar = () => {
  const isOpened = useRecoilValue(isSideNavOpenState);

  return (
    <Container>
      <ListContainer isOpened={isOpened}>
        {Menus.map(({ title, icon }) => (
          <List key={title} role="button">
            {icon}
            <Transition mounted={isOpened} transition="fade" duration={400} timingFunction="ease">
              {styles => <Title style={styles}>{title}</Title>}
            </Transition>
          </List>
        ))}
      </ListContainer>
      <List>
        <IconLogout />
        <Transition mounted={isOpened} transition="fade" duration={400} timingFunction="ease">
          {styles => <Title style={styles}>SIGN OUT</Title>}
        </Transition>
      </List>
    </Container>
  );
};

export default SideNavBar;
