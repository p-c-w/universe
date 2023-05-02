import axios from 'axios';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { TextInput, PasswordInput, Button, Container } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { IconX } from '@tabler/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';

import { signUpSchema } from '../../schema/schema';
import Typing from './Typing';

const EmailInput = styled(TextInput)`
  .mantine-TextInput-label {
    font-weight: 300;
    color: var(--mantine-color-cyan-4);
  }
`;

const PasswordFormInput = styled(PasswordInput)`
  .mantine-PasswordInput-label {
    font-weight: 300;
    color: var(--mantine-color-cyan-4);
  }
`;

const InputButton = styled(Button)`
  align-self: flex-end;
`;

const SignupForm = ({ setUserInput }) => {
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async data => {
    try {
      const { data: email } = await axios.post('/api/auth/signup', data);

      setUserInput(email);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        notifications.show({
          id: 'hello-there',
          withCloseButton: true,
          autoClose: 2000,
          title: 'Signup Failure',
          message: '중복된 이메일이 존재합니다.',
          color: 'red',
          icon: <IconX />,
          className: 'my-notification-class',
          loading: false,
        });
      } else {
        notifications.show({
          id: 'hello-there',
          withCloseButton: true,
          autoClose: 2000,
          title: 'Signup Failure',
          message: '알 수 없는 오류가 발생했습니다.',
          color: 'red',
          icon: <IconX />,
          className: 'my-notification-class',
          loading: false,
        });
      }
    }
  };

  return (
    <>
      <Typing str="Welcome to Universe!" isLast={0} />
      <Typing
        str="Let's begin the adventure🚀👾"
        isLast={1}
        onAnimationEnd={() => {
          setStep(step + 1);
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {step > 0 && (
          <Container display="flex" my={20} p={0}>
            <EmailInput
              w="100%"
              label="Enter your email"
              autoComplete="off"
              withAsterisk
              {...register('email')}
              error={errors?.email?.message}
              icon={errors?.email && <IconX size="1rem" strokeWidth={2} color={'#862d2d'} />}
            />
            {!errors?.email && (
              <InputButton
                type="button"
                onClick={() => {
                  setStep(step + 1);
                }}
                fw={300}
                variant="outline"
                color="gray">
                Continue
              </InputButton>
            )}
          </Container>
        )}
        {step > 1 && (
          <Container display="flex" my={20} p={0}>
            <PasswordFormInput
              w="100%"
              label="Create a password"
              withAsterisk
              {...register('password')}
              error={errors?.password?.message}
              icon={errors?.password && <IconX size="1rem" strokeWidth={2} color={'#862d2d'} />}
            />
            {!errors?.password && (
              <InputButton
                type="button"
                onClick={() => {
                  setStep(step + 1);
                }}
                variant="outline"
                fw={300}
                color="gray">
                Continue
              </InputButton>
            )}
          </Container>
        )}
        {step > 2 && (
          <Container display="flex" my={20} p={0}>
            <PasswordFormInput
              w="100%"
              label="Please enter your password again"
              withAsterisk
              {...register('confirmPassword')}
              error={errors?.confirmPassword?.message}
              icon={errors?.confirmPassword && <IconX size="1rem" strokeWidth={2} color={'#862d2d'} />}
            />
            {!errors?.confirmPassword && (
              <InputButton
                type="button"
                onClick={() => {
                  setStep(step + 1);
                }}
                fw={300}
                variant="outline"
                color="gray">
                Continue
              </InputButton>
            )}
          </Container>
        )}
        {step > 3 && (
          <Button type="submit" fullWidth>
            Sign Up
          </Button>
        )}
      </form>
    </>
  );
};

export default SignupForm;
