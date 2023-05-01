import React from 'react';
import { Link } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';
import { Button } from '@mantine/core';

import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import userState from '../../recoil/atom/userState';

const Signout = ({ size, fontSize }) => {
  const setUser = useSetRecoilState(userState);
  const handleClick = async () => {
    await axios.get('/api/auth/signout');
    setUser('');
    localStorage.removeItem('user');
  };

  return (
    <>
      <Button
        bg="none"
        variant="none"
        ml={30}
        w={size}
        fw={`var(--mantine-font-size-${fontSize})`}
        display={'flex'}
        component={Link}
        to="/"
        onClick={handleClick}>
        <IconLogout display={'inline'} />
        SIGN OUT
      </Button>
    </>
  );
};

export default Signout;
