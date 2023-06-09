import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from '@emotion/styled';
import { Title, Flex, Input, PasswordInput, Button, TextInput, Text } from '@mantine/core';
import { signInSchema } from '../../../schema/schema';
import userState from '../../../recoil/atom/userState';
import { showNotification } from '../../../utils';
import { signIn } from '../../../api';

const Form = styled.form`
  border: 1px solid ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[2])};
  border-radius: 0.375rem;
`;

const InputWrapper = styled(Input.Wrapper)`
  > label {
    font-weight: 300;
  }
`;

const SigninForm = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signInSchema) });

  const submitForm = async data => {
    try {
      const user = await signIn(data);

      setUser(user);
      navigate('/');
    } catch (error) {
      const message = error.response && error.response.status === 401 ? error.response.data : undefined;
      showNotification(false, '로그인', message);
    }
  };

  return (
    <>
      <Title fz={24} fw={300} mb={20} align="center">
        Sign in to Universe
      </Title>
      <Form action="/" onSubmit={handleSubmit(submitForm)} method="post">
        <Flex p={25} justify="space-between" direction="column" gap={20}>
          <InputWrapper label="Email address">
            <TextInput {...register('email')} error={errors?.email?.message} autoComplete="off" />
          </InputWrapper>
          <InputWrapper label="Password" pos="relative">
            <Text span fz="xs" color="blue.6" pos="absolute" right={0} top={5} justify="center" underline align="right">
              Forgot password?
            </Text>
            <PasswordInput {...register('password')} error={errors?.password?.message} />
          </InputWrapper>
          <Button type="submit" fw={300}>
            Sign in
          </Button>
        </Flex>
      </Form>
    </>
  );
};

export default SigninForm;
