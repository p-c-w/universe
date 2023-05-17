import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useUserQuery } from '../../hooks/queries';
import { userState } from '../../recoil/atom';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { Title, Container, Flex, Button, Text } from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons-react';

const DeleteUser = () => {
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  const { userInfo: name } = useUserQuery({ select: userInfo => userInfo.name });

  const handleClick = async () => {
    try {
      const { data: alarm } = await axios.delete(`/api/auth/withdrawal/${user}`);
      setUser(null);
      localStorage.removeItem('user');

      notifications.show({
        withCloseButton: true,
        autoClose: 3000,
        title: 'Withdrawal Success',
        message: alarm,
        color: 'green',
        icon: <IconCheck />,
        loading: false,
      });

      modals.closeAll();
      navigate('/');
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

  const openModal = () => {
    modals.openConfirmModal({
      title: '회원 탈퇴',
      centered: true,
      closeOnConfirm: false,
      labels: { confirm: '예', cancel: '아니오' },
      children: (
        <Flex direction={'column'} gap={20}>
          <Text> {name}님의 유니버스가 삭제되며 복구 불가능합니다.</Text>
          <Text> 이에 동의하십니까?</Text>
        </Flex>
      ),
      onConfirm: () => {
        modals.closeAll();

        modals.openConfirmModal({
          title: '회원 탈퇴',
          centered: true,
          labels: { confirm: '탈퇴하기', cancel: '취소하기' },
          closeOnConfirm: false,
          children: <Text size="sm">그동안 유니버스를 이용해 주셔서 감사합니다.</Text>,
          onCancel: modals.closeAll,
          onConfirm: handleClick,
        });
      },
    });
  };

  return (
    <Container p={0}>
      <Flex gap={50} align={'center'} justify={'space-between'}>
        <Title order={5}>회원탈퇴</Title>
        <Button onClick={openModal} variant="outline">
          탈퇴
        </Button>
      </Flex>
    </Container>
  );
};

export default DeleteUser;
