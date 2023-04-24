import React from 'react';
import styled from '@emotion/styled';
import { useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { SigninForm } from '../components/auth';

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

const Callout = styled.div`
  border: 1px solid ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[1])};
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
          <Form>
            <SigninForm />
            <Callout>
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
