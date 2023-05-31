import React from 'react';
import styled from '@emotion/styled';
import { IconChevronsUp } from '@tabler/icons-react';
import { keyframes } from '@emotion/react';
import { useMantineColorScheme } from '@mantine/core';
import { useYScroll } from '../../../hooks';
import { goToTop } from '../../../utils';

const glow = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
    transform: translate3D(-50%, 10px, 0);
  }
`;

const Icon = styled(IconChevronsUp)`
  position: fixed;
  left: 50%;
  bottom: 20px;
  width: 4.375rem;
  height: 4.375rem;
  padding: 0.75rem;
  transform: translate3D(-50%, 0, 0);
  font-size: 3em;
  border-radius: 50%;
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.black : theme.white)};
  box-shadow: var(--mantine-shadow-lg);
  cursor: pointer;
  animation: ${glow} 4s infinite;
  z-index: 9999;
`;

const TopButton = ({ boundary = 300 }) => {
  const yPos = useYScroll();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return yPos >= boundary && <Icon role="button" color={dark ? 'white' : 'black'} onClick={goToTop} />;
};

export default TopButton;
