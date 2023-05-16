import axios from 'axios';
import React, { useState } from 'react';
import { Container, Title, Flex, Button, Modal } from '@mantine/core';
import { Password } from '.';
import { useDisclosure } from '@mantine/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUpSchema } from '../../schema/schema';
import { notifications } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom';

const EditPassword = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const email = useRecoilValue(userState);
  const [nowPw, setNowPw] = useState(null);
  const [newPw, setNewPw] = useState(null);
  const [newConfirmPw, setNewConfirmPw] = useState(null);

  const { control, trigger } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data: alarm } = await axios.patch('/api/auth/changepw', { email, nowPw, newPw, newConfirmPw });

      notifications.show({
        withCloseButton: true,
        autoClose: 3000,
        title: 'Password Change Success',
        message: alarm,
        color: 'green',
        icon: <IconCheck />,
        loading: false,
      });
      close();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        notifications.show({
          withCloseButton: true,
          autoClose: 3000,
          title: 'Password Change Failure',
          message: error.response.data,
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
      } else {
        notifications.show({
          withCloseButton: true,
          autoClose: 3000,
          title: 'Password Change Failure',
          message: '알 수 없는 오류가 발생했습니다.',
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
      }
    }
  };

  return (
    <Container my={10} p={0}>
      <Modal opened={opened} centered onClose={close} title="비밀번호 변경" style={{ marginTop: '10rem' }}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={10}>
            <Password label="현재 비밀번호" control={control} trigger={trigger} setPw={setNowPw} />
            <Password label="새 비밀번호" control={control} trigger={trigger} name="password" setPw={setNewPw} />
            <Password
              label="새 비밀번호 확인"
              control={control}
              trigger={trigger}
              name="confirmPassword"
              setPw={setNewConfirmPw}
            />
            <Button type="submit">제출</Button>
          </Flex>
        </form>
      </Modal>
      <Flex gap={50} align={'center'} justify={'space-between'}>
        <Title order={5}>비밀번호</Title>
        <Button onClick={open} variant="outline">
          수정
        </Button>
      </Flex>
    </Container>
  );
};

export default EditPassword;
