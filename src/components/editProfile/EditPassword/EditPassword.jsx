import axios from 'axios';
import { Container, Title, Flex, Button } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { modals } from '@mantine/modals';
import { userState } from '../../../recoil/atom';
import { ChangePwSchema } from '../../../schema/schema';
import { Password } from '.';

import { showNotification } from '../../../utils';

const EditPassword = () => {
  const email = useRecoilValue(userState);

  const { control, trigger, handleSubmit } = useForm({
    resolver: zodResolver(ChangePwSchema),
  });

  const SubmitForm = async data => {
    try {
      const { data: message } = await axios.patch('/api/auth/changepw', { email, ...data });
      showNotification(true, '비밀번호 변경', message);

      modals.closeAll();
    } catch (error) {
      const message = error.response && error.response.status === 401 && error.response.data;

      showNotification(false, '비밀번호 변경', message);
    }
  };

  const openModal = () => {
    modals.open({
      title: '비밀번호 변경',
      centered: true,
      children: (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(SubmitForm)();
          }}>
          <Flex direction="column" gap={10}>
            <Password label="현재 비밀번호" control={control} trigger={trigger} name="nowPassword" />
            <Password label="새 비밀번호" control={control} trigger={trigger} name="newPassword" />
            <Password label="새 비밀번호 확인" control={control} trigger={trigger} name="confirmPassword" />
            <Button type="submit">제출</Button>
          </Flex>
        </form>
      ),
    });
  };

  return (
    <Container my={10} p={0}>
      <Flex gap={50} align="center" justify="space-between">
        <Title order={5}>비밀번호</Title>
        <Button onClick={openModal} variant="outline">
          수정
        </Button>
      </Flex>
    </Container>
  );
};

export default EditPassword;
