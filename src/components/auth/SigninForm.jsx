import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Input, PasswordInput, Button, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

import { useSetRecoilState } from 'recoil';
import { signInSchema } from '../../schema/schema';
import userState from '../../recoil/atom/userState';

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
`;

const FormBody = styled.form`
  padding: 1rem;
  border: 1px solid ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[1])};
  border-radius: 0.375rem;
  height: 15.625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputWrapper = styled(Input.Wrapper)`
  > label {
    font-weight: 300;
  }

  width: full;
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
  width: full;
`;

const SigninForm = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signInSchema) });

  const handleonSubmit = async data => {
    try {
      const { data: user } = await axios.post('/api/auth/signin', data);

      setUser(user);
      navigate('/');
    } catch (e) {
      console.log(e);
      notifications.show({
        id: 'hello-there',
        withCloseButton: true,
        autoClose: 2000,
        title: 'Login Failure',
        message: 'Incorrect username or password.',
        color: 'red',
        icon: <IconX />,
        className: 'my-notification-class',
        loading: false,
      });
    }
  };

  return (
    <>
      <Title>Sign in to Universe</Title>
      <FormBody action="/" onSubmit={handleSubmit(handleonSubmit)} method="post">
        <InputWrapper label="Email address">
          <TextInput {...register('email')} error={errors?.email?.message} />
        </InputWrapper>
        <InputWrapper label="Password">
          <ForgotPw to="/">Forgot password?</ForgotPw>
          <PasswordInput {...register('password')} error={errors?.password?.message} />
        </InputWrapper>
        <SubmitBtn type="submit" color="teal">
          Sign in
        </SubmitBtn>
      </FormBody>
    </>
  );
};

export default SigninForm;
