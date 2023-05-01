import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Title, Flex, Input, PasswordInput, Button, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

import { useSetRecoilState } from 'recoil';
import { signInSchema } from '../../schema/schema';
import userState from '../../recoil/atom/userState';

const FormBody = styled.form`
  border: 1px solid ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[1])};
  border-radius: 0.375rem;
`;

const InputWrapper = styled(Input.Wrapper)`
  > label {
    font-weight: 300;
  }
`;

const ForgotPw = styled(Link)`
  float: right;
  font-size: var(--mantine-font-size-xs);
  color: var(--mantine-color-blue-6);
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
      <Title fz={24} fw={300} mb={20} align="center">
        Sign in to Universe
      </Title>
      <FormBody action="/" onSubmit={handleSubmit(handleonSubmit)} method="post">
        <Flex p={16} justify="space-between" direction="column" gap={20}>
          <InputWrapper label="Email address">
            <TextInput {...register('email')} error={errors?.email?.message} />
          </InputWrapper>
          <InputWrapper label="Password">
            <ForgotPw to="/">Forgot password?</ForgotPw>
            <PasswordInput {...register('password')} error={errors?.password?.message} />
          </InputWrapper>
          <Button type="submit" fw={300}>
            Sign in
          </Button>
        </Flex>
      </FormBody>
    </>
  );
};

export default SigninForm;
