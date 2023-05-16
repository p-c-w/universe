import React from 'react';
import { Container, Flex, Title, Text } from '@mantine/core';
import { GlobalShell } from '../components/common';
import { EditPassword, DeleteUser } from '../components/editProfile';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atom';

const EditProfile = () => {
  const email = useRecoilValue(userState);

  return (
    <GlobalShell>
      <Flex w={1240} mt="1rem" mx="auto" size={'100%'} miw={375} direction={'column'} justify={'center'}>
        <Container w={400} mt={100}>
          <Title order={2} align="center" my={20}>
            👾 나의 프로필 수정 👾
          </Title>
          <Flex gap={50} mt={10} justify={'space-between'}>
            <Title order={5}>이메일</Title>
            <Text>{email}</Text>
          </Flex>
          <EditPassword />
          <DeleteUser />
        </Container>
      </Flex>
    </GlobalShell>
  );
};

export default EditProfile;
