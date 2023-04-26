import React, { useState } from 'react';
import styled from '@emotion/styled';

const Btn = styled.button`
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;

  box-shadow: ${({ active }) => active && '0px 0px 15px 5px rgba(99, 95, 225, 0.5)'};
  border-radius: ${({ active }) => active && '50%'};
`;

const LogoImg = styled.img`
  width: 4.375rem;
  height: 70px;
`;

const LogoBtn = ({ logo: { id, name }, idx, subscribedOtt, setSubscribedOtt }) => {
  const [active, setActive] = useState(false);

  const handleLogoClick = () => {
    if (active) {
      const newSubscribedOtt = subscribedOtt.filter(ott => ott.id !== id);
      setSubscribedOtt(newSubscribedOtt);
      setActive(!active);
    } else {
      const newSubscribedOtt = [...subscribedOtt, { id, price: 'basic' }];
      setSubscribedOtt(newSubscribedOtt);
      setActive(!active);
    }
  };

  return (
    <>
      <Btn onClick={handleLogoClick} type="button" active={active} disabled={idx > 5}>
        <LogoImg id={id} src={`./assets/badges/${name}.svg`} alt="button" />
      </Btn>
    </>
  );
};

export default LogoBtn;
