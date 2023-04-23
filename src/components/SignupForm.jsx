import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Container, TextInput, PasswordInput, Button } from '@mantine/core';

const Top = styled.div`
  padding: 40px 80px;
`;

const Logo = styled.button`
  width: 3.75rem;
  height: 3.75rem;
  border: none;
  background-color: transparent;
  float: left;
`;

const Callout = styled.div`
  float: right;
`;

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
    <Top className="conatiner top">
      <Logo>
        <img src={`./assets/logos/universeLogoWhite.svg`} alt="home button" />
      </Logo>
      <Callout>
        <span>Already have an account?</span>
        <Link to="/signin">Sign in→</Link>
      </Callout>
    </Top>
    <Container style={{ width: '600px', padding: '20px', border: '1px solid #373a40', borderRadius: '6px' }}>
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
    </Container>
  </>
);

export default SignupForm;
