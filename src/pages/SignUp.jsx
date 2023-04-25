import React, { useState } from 'react';
import { Flex, Container } from '@mantine/core';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { SignupHeader, SignupForm, SignupOption } from '../components/auth';

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
`;

const zoom = keyframes`
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(2, 2);
  }
`;

const Star = styled.div`
  background-image: radial-gradient(2px 2px at 50px 200px, #eee, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(3px 4px at 120px 40px, #ddd, rgba(0, 0, 0, 0));
  background-repeat: repeat;
  animation: ${zoom} 10s infinite;
  background-position: 10% 90%;
  animation-delay: 0s;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;

  :nth-child(1) {
    background-position: 10% 90%;
    animation-delay: 0s;
  }
  :nth-child(2) {
    background-position: 20% 50%;
    background-size: 270px 500px;
    animation-delay: 0.3s;
  }
  :nth-child(3) {
    background-position: 40% -80%;
    animation-delay: 1.2s;
  }
  :nth-child(4) {
    background-position: -20% -30%;
    transform: rotate(60deg);
    animation-delay: 2.5s;
  }

  :nth-child(5) {
    background-position: 50% 20%;
    animation-delay: 3s;
  }
`;

const BackImg = styled.img`
  top: 20%;
  left: 50%;
  transform: translate(-18%, -25%);
  overflow: hidden !important;
`;

const SignUp = () => {
  const [active, setActive] = useState('option');

  return (
    <>
      <Background>
        <Star />
        <Star />
        {/* <Star />
        <Star />
        <Star /> */}
        <BackImg
          src="https://github.githubassets.com/images/modules/site/home/hero-glow.svg"
          alt="Glowing universe"
          className="js-warp-hide position-absolute overflow-hidden home-hero-glow events-none"></BackImg>
      </Background>
      <SignupHeader />
      <Flex mih={500} justify="center" direction="column" wrap="wrap">
        <Container style={{ width: '600px', padding: '20px', border: '1px solid #373a40', borderRadius: '6px' }}>
          {active === 'form' ? <SignupForm setActive={setActive} /> : <SignupOption />}
        </Container>
      </Flex>
    </>
  );
};

export default SignUp;
