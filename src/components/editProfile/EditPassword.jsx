import React from 'react';
import { Container, Title, Flex, Button, Modal } from '@mantine/core';
import { Password } from '.';

const EditPassword = () => {
  return (
    <Container>
      <Modal opened={opened} onClose={close} title="비밀번호 변경"></Modal>
      <Flex gap={50}>
        <Title order={2}>비밀번호</Title>
        <Flex direction={'column'} gap={10}>
          <Password label={'현재 비밀번호'} control={control} trigger={trigger} />
          <Password label={'새 비밀번호'} control={control} trigger={trigger} name={'password'} />
          <Password label={'새 비밀번호 확인'} control={control} trigger={trigger} name={'confirmPassword'} />
          <Button>제출</Button>
        </Flex>
        <Button onClick={open}>수정</Button>
      </Flex>
    </Container>
  );
};

export default EditPassword;
