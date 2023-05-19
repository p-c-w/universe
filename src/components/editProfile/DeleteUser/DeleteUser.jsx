import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modals } from '@mantine/modals';
import { Title, Container, Flex, Button, Text } from '@mantine/core';
import { userState } from '../../../recoil/atom';
import { useUserQuery } from '../../../hooks/queries';
import { showNotification } from '../../../utils';

const DELETE_ACCOUNT = '회원탈퇴';

const DeleteUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);
  const { userInfo: name } = useUserQuery({ select: userInfo => userInfo.name });

  const submitWithdrawal = async () => {
    try {
      const { data: message } = await axios.delete(`/api/auth/withdrawal/${user}`);
      setUser(null);
      localStorage.removeItem('user');

      showNotification(true, DELETE_ACCOUNT, message);

      modals.closeAll();
      navigate('/');
    } catch (error) {
      showNotification(false, DELETE_ACCOUNT);
    }
  };

  const openModal = () => {
    modals.openConfirmModal({
      title: DELETE_ACCOUNT,
      centered: true,
      closeOnConfirm: false,
      labels: { confirm: '예', cancel: '아니오' },
      children: (
        <Flex direction="column" gap={20}>
          <Text> {name}님의 유니버스가 삭제되며 복구 불가능합니다.</Text>
          <Text> 이에 동의하십니까?</Text>
        </Flex>
      ),
      onConfirm: () => {
        modals.closeAll();

        modals.openConfirmModal({
          title: DELETE_ACCOUNT,
          centered: true,
          labels: { confirm: '탈퇴하기', cancel: '취소하기' },
          closeOnConfirm: false,
          children: <Text size="sm">그동안 유니버스를 이용해 주셔서 감사합니다.</Text>,
          onCancel: modals.closeAll,
          onConfirm: submitWithdrawal,
        });
      },
    });
  };

  return (
    <Container p={0}>
      <Flex gap={50} align="center" justify="space-between">
        <Title order={5}>회원탈퇴</Title>
        <Button onClick={openModal} variant="outline">
          탈퇴
        </Button>
      </Flex>
    </Container>
  );
};

export default DeleteUser;
