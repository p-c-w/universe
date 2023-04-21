import React from 'react';
import styled from '@emotion/styled';
import { Input, PasswordInput, Button, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const AuthForm = styled.div`
  font-weight: 300;
`;

const AuthHeader = styled.div`
  padding: 2.25rem 0 1.25rem 0;
`;

const LogoImg = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  margin: 0 auto;
`;

const Form = styled.div`
  width: 21.25rem;
  min-width: 17.125rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
`;

const FormBody = styled.div`
  padding: 1rem;
  border: ${({ darkmode }) => (darkmode ? '1px solid #21262d' : '1px solid #d0d7de')};
  border-radius: 0.375rem;
  height: 14.375rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputWrapper = styled(Input.Wrapper)`
  > label {
    font-weight: 300;
  }
`;

const ForgotPw = styled(Link)`
  float: right;
  font-size: 0.75rem;
  color: #2f81f7;
`;

const SubmitBtn = styled(Button)`
  padding: 0.3125rem 1rem;
  font-weight: 300;
  background-color: #1f883d;
`;

const Callout = styled.div`
  border: ${({ darkmode }) => (darkmode ? '1px solid #21262d' : '1px solid #d0d7de')};
  border-radius: 0.375rem;
  text-align: center;
  margin: 1rem 0 10px 0;
`;

const CreateAccount = styled(Link)`
  font-size: 0.875rem;
  color: #2f81f7;
`;

const SignIn = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <>
      <Container>
        <AuthForm className="auth-form px-3">
          <AuthHeader>
            <LogoImg>
              <img src={`./assets/logos/universe${dark ? 'LogoWhite' : 'LogoBlack'}.svg`} alt="home button" />
            </LogoImg>
          </AuthHeader>
          <Form className="auth-form mt-3">
            <Title>Sign in to Universe</Title>
            <FormBody action="/" method="post" darkmode={dark}>
              <InputWrapper label="Username or email address" fullWidth>
                <Input fullWidth />
              </InputWrapper>
              <InputWrapper label="Password">
                <ForgotPw to="/">Forgot password?</ForgotPw>
                <PasswordInput />
              </InputWrapper>
              <SubmitBtn type="submit" fullWidth color="teal">
                Sign in
              </SubmitBtn>
            </FormBody>
            <Callout darkmode={dark}>
              <p className="login-callout">
                New to Universe? <CreateAccount to="/signup">Create an accout</CreateAccount>.
              </p>
            </Callout>
          </Form>
        </AuthForm>
      </Container>
    </>
  );
};

export default SignIn;
