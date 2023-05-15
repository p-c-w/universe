import axios from 'axios';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { IconX, IconCheck } from '@tabler/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';

import { signUpSchema } from '../../schema/schema';
import Typing from './Typing';

import EmailInput from './EmailInput';
import PasswordFormInput from './PasswordFormInput';

const InputButton = styled(Button)`
  align-self: flex-end;
`;

const SignupForm = ({ setUserInput }) => {
  const [step, setStep] = useState(0);

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: null,
      password: null,
      confirmPassword: null,
    },
  });

  const onSubmit = async data => {
    try {
      const { data: email } = await axios.post('/api/auth/signup', data);

      notifications.show({
        id: 'hello-there',
        withCloseButton: true,
        autoClose: 2000,
        title: 'Signup Failure',
        message: '회원가입에 성공했습니다.',
        color: 'green',
        icon: <IconCheck />,
        className: 'my-notification-class',
        loading: false,
      });
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

  const ContinueBtn = (
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
  );

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
        {step > 0 && <EmailInput name="email" control={control} trigger={trigger} children={ContinueBtn} />}
        {step > 1 && <PasswordFormInput name="password" control={control} trigger={trigger} children={ContinueBtn} />}
        {step > 2 && (
          <PasswordFormInput name="confirmPassword" control={control} trigger={trigger} children={ContinueBtn} />
        )}
        {step > 3 && (
          <Button type="submit" disabled={!isValid} fullWidth>
            Sign Up
          </Button>
        )}
      </form>
    </>
  );
};

export default SignupForm;
