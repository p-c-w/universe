import React from 'react';
import styled from '@emotion/styled';
import { TextInput, PasswordInput, Button } from '@mantine/core';

import Typing from './Typing';

const EmailInput = styled(TextInput)`
  > label,
  span {
    font-weight: 300;
    color: #00cfc8;
  }
`;

const PasswordFormInput = styled(PasswordInput)`
  > label,
  span {
    font-weight: 300;
    color: #00cfc8;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 32px 0;
`;

const InputButton = styled(Button)`
  float: right;
  align-self: flex-end;
  font-weight: 300;
`;

const SignupForm = ({ setActive }) => {
  const handleClick = () => {
    setActive(2);
  };

  return (
    <>
      <Typing str="Welcome to Universe!" isLast={0} />
      <Typing str="Let's begin the adventure🚀👾" isLast={1} />
      <InputWrapper>
        <EmailInput style={{ width: '600px' }} label="Enter your email" withAsterisk />
        <InputButton variant="outline" color="gray">
          Continue
        </InputButton>
      </InputWrapper>
      <InputWrapper>
        <PasswordFormInput style={{ width: '100%' }} label="Create a password" withAsterisk />
        <InputButton variant="outline" color="gray">
          Continue
        </InputButton>
      </InputWrapper>
      <InputWrapper>
        <PasswordFormInput style={{ width: '100%' }} label="Please enter your password again" withAsterisk />
        <InputButton variant="outline" color="gray">
          Continue
        </InputButton>
      </InputWrapper>
      <Button fullWidth style={{ float: 'right' }} onClick={handleClick}>
        Sign Up
      </Button>
    </>
  );
};

export default SignupForm;
