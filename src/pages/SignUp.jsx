import React, { useState } from 'react';
import { Flex, Container } from '@mantine/core';

import { SignupHeader, SignupForm, SignupOption } from '../components/auth';

const SignUp = () => {
  const [active, setActive] = useState('form');

  return (
    <>
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
