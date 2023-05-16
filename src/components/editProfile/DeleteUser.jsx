import React, { useState } from 'react';
import { Title, Container, Flex, Button, Modal, Text, Checkbox } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUserQuery } from '../../hooks/queries';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom';
import { notifications } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';

const DeleteUser = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(true);
  const email = useRecoilValue(userState);

  const { userInfo: name } = useUserQuery({ select: userInfo => userInfo.name });

  const handleClick = async () => {
    console.log('Hi!');
    try {
      const { data: alarm } = await axios.delete(`/api/auth/withdrawal/${email}`);

      notifications.show({
        withCloseButton: true,
        autoClose: 3000,
        title: 'Withdrawal Success',
        message: alarm,
        color: 'green',
        icon: <IconCheck />,
        loading: false,
      });
      close();
    } catch (error) {
      notifications.show({
        withCloseButton: true,
        autoClose: 3000,
        title: 'Withdrawal Failure',
        message: '알 수 없는 오류가 발생했습니다.',
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  };

  return (
    <Container>
      <Modal opened={opened} centered onClose={close} title="회원 탈퇴" style={{ marginTop: '10rem' }}>
        <Flex direction={'column'} gap={20}>
          <Text> 회원 탈퇴시 {name}님의 유니버스가 삭제되며 복구 불가능합니다.</Text>
          <Checkbox onChange={event => setChecked(!event.currentTarget.checked)} label="이에 동의하십니까?" />
          <Flex gap={3}>
            <Button fullWidth variant="outline" onClick={close}>
              취소하기
            </Button>
            <Button onClick={handleClick} fullWidth variant="outline" disabled={checked}>
              탈퇴하기
            </Button>
          </Flex>
        </Flex>
      </Modal>
      <Flex gap={50}>
        <Title order={5}>회원탈퇴</Title>
        <Button onClick={open} variant="outline">
          탈퇴
        </Button>
      </Flex>
    </Container>
  );
};

export default DeleteUser;
