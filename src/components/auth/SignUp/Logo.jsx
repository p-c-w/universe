import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Image } from '@mantine/core';

const LogoButton = styled(Button)`
  box-shadow: ${({ selected }) => selected && '0px 0px 15px 10px rgba(79, 74, 216, 0.5)'};
  border-radius: 50%;
  padding: 0;
  height: 4.375rem;
`;

const Logo = ({ logo: { id, name }, idx, subscribedOtt, setSubscribedOtt }) => {
  const [selected, setSelected] = useState(false);

  const removeLogo = () => {
    const newSubscribedOtt = subscribedOtt.filter(ott => ott.id !== id);
    setSubscribedOtt(newSubscribedOtt);
    setSelected(!selected);
  };

  const selectLogo = () => {
    const newSubscribedOtt = [...subscribedOtt, { id, price: 'basic' }];
    setSubscribedOtt(newSubscribedOtt);
    setSelected(!selected);
  };

  return (
    <LogoButton
      onClick={selected ? removeLogo : selectLogo}
      selected={selected}
      variant="none"
      type="button"
      disabled={idx > 5}>
      <Image width={70} id={id} src={`./assets/badges/${name}.svg`} alt="button" />
    </LogoButton>
  );
};

export default Logo;
