import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../../../schema/schema';
import { Typing, SignupInput } from '.';
import { showNotification } from '../../../utils';

const SIGN_UP = '회원가입';

const SignupForm = ({ setUserInput }) => {
  const [step, setStep] = useState(0);

  const {
    handleSubmit,
    trigger,
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const submitForm = async data => {
    try {
      const {
        data: { email, name },
      } = await axios.post('/api/auth/signup', data);

      const message = `${name}님의 유니버스 가입을 축하드립니다.`;

      showNotification(true, SIGN_UP, message);
      setUserInput(email);
    } catch (error) {
      const message = error.response && error.response.status === 409 ? error.response.data : undefined;

      showNotification(false, SIGN_UP, message);
    }
  };

  return (
    <>
      <Typing str="Welcome to Universe!" isLast={0} />
      <Typing
        str="Let's begin the adventure🚀👾"
        isLast={1}
        setAnimationCompleted={() => {
          setStep(step + 1);
        }}
      />
      <form onSubmit={handleSubmit(submitForm)}>
        {step > 0 && <SignupInput name="email" control={control} step={step} trigger={trigger} setStep={setStep} />}
        {step > 1 && <SignupInput name="password" control={control} step={step} trigger={trigger} setStep={setStep} />}
        {step > 2 && (
          <SignupInput name="confirmPassword" control={control} step={step} trigger={trigger} setStep={setStep} />
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
