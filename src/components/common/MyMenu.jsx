import { Menu, Avatar } from '@mantine/core';
import { IconSettings, IconMessageCircle, IconArrowsLeftRight, IconPlanet, IconLogout } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userState } from '../../recoil/atom';

const IconBox = styled(Avatar)`
  cursor: pointer;
`;

const MyMenu = ({ initial }) => {
  const setUser = useSetRecoilState(userState);

  const handleClick = async () => {
    await axios.get('/api/auth/signout');
    setUser(null);
    localStorage.removeItem('user');
  };

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
        <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={handleClick}>
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MyMenu;
