import React from 'react';
import { Link } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';
import styled from '@emotion/styled';

import axios from 'axios';

const SignoutLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
`;

const Title = styled.span`
  width: ${({ size }) => size};
  margin-left: 1.875rem;
  font-size: ${({ fontSize }) => `var(--mantine-font-size-${fontSize})`};
`;

const Signout = ({ styleProps, titleSize, fontSize }) => {
  const handleClick = async () => {
    await axios.get('/api/auth/signout');
    localStorage.removeItem('user');
  };

  return (
    <>
      <SignoutLink to="/" onClick={handleClick}>
        <IconLogout display={'inline'} />
        <Title size={titleSize} style={styleProps} fontSize={fontSize}>
          SIGN OUT
        </Title>
      </SignoutLink>
    </>
  );
};

export default Signout;
