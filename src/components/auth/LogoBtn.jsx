import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Image } from '@mantine/core';

const Logo = styled(Button)`
  box-shadow: ${({ selected }) => selected && '0px 0px 15px 10px rgba(79, 74, 216, 0.5)'};
  border-radius: 50%;
`;

const LogoBtn = ({ logo: { id, name }, idx, subscribedOtt, setSubscribedOtt }) => {
  const [selected, setSelected] = useState(false);

  const handleLogoClick = () => {
    if (selected) {
      const newSubscribedOtt = subscribedOtt.filter(ott => ott.id !== id);
      setSubscribedOtt(newSubscribedOtt);
      setSelected(!selected);
    } else {
      const newSubscribedOtt = [...subscribedOtt, { id, price: 'basic' }];
      setSubscribedOtt(newSubscribedOtt);
      setSelected(!selected);
    }
  };

  return (
    <>
      <Logo onClick={handleLogoClick} selected={selected} p={0} h={70} variant="none" type="button" disabled={idx > 5}>
        <Image width={70} id={id} src={`./assets/badges/${name}.svg`} alt="button" />
      </Logo>
    </>
  );
};

export default LogoBtn;
