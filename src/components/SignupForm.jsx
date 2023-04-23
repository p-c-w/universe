import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { TextInput, PasswordInput, Button } from '@mantine/core';

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

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const typingCursor = keyframes`
 from {
    border-right-color: rgba(17, 17, 17, 0.9);
  }
  to {
    border-right-color: rgba(255, 255, 255, 0.8);
  }
`;

const FirstTypeOut = styled.div`
  overflow: hidden;
  border-right: 2px solid none;
  white-space: nowrap;
  font-size: 1.6rem;
  width: 0;
  animation: ${typing} 2s steps(20, end) forwards, ${typingCursor} 900ms steps(20);
`;

const SecondTypeOut = styled.div`
  overflow: hidden;
  border-right: 2px solid none;
  white-space: nowrap;
  font-size: 1.6rem;
  width: 0;
  animation: ${typing} 2s steps(20, end) forwards, ${typingCursor} 900ms steps(20) infinite;
  animation-delay: 2s;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 32px 0;
`;

const InputButton = styled(Button)`
  float: right;
  align-self: flex-end;
`;

const SignupForm = () => (
  <>
    <FirstTypeOut>Welcome to Universe!</FirstTypeOut>
    <SecondTypeOut>Let{`'`}s begin the adventure🚀👾</SecondTypeOut>
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
    <Button fullWidth style={{ float: 'right' }}>
      Sign Up
    </Button>
  </>
);

export default SignupForm;
