import { Link } from 'react-router-dom';
import { Menu, Avatar } from '@mantine/core';
import styled from '@emotion/styled';
import { IconSettings, IconMessageCircle, IconArrowsLeftRight, IconPlanet, IconLogout } from '@tabler/icons-react';
import { useSignout } from '../../hooks';

const IconBox = styled(Avatar)`
  cursor: pointer;
`;

const MyMenu = ({ initial }) => {
  const signout = useSignout();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <IconBox color="violet" size="md" variant="filled">
          {initial}
        </IconBox>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconPlanet size={14} />} component={Link} to={'/mypage'}>
          My Universe
        </Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Message</Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
        <Menu.Item component={Link} to={'/'} color="red" icon={<IconLogout size={14} />} onClick={signout}>
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MyMenu;
