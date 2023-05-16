import axios from 'axios';
import React from 'react';
import { Container, Title, Flex, Button, Modal } from '@mantine/core';
import { Password } from '.';
import { useDisclosure } from '@mantine/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ChangePwSchema } from '../../schema/schema';
import { notifications } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom';

const EditPassword = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const email = useRecoilValue(userState);

  const { control, trigger, handleSubmit } = useForm({
    resolver: zodResolver(ChangePwSchema),
  });

  const onSubmit = async data => {
    try {
      const { data: alarm } = await axios.patch('/api/auth/changepw', { email, ...data });

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
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }}>
          <Flex direction="column" gap={10}>
            <Password label="현재 비밀번호" control={control} trigger={trigger} name="nowPassword" />
            <Password label="새 비밀번호" control={control} trigger={trigger} name="newPassword" />
            <Password label="새 비밀번호 확인" control={control} trigger={trigger} name="confirmPassword" />
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