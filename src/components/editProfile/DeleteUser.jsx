import React, { useState } from 'react';
import { Title, Container, Flex, Button, Modal, Text, Checkbox } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const DeleteUser = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(true);

  return (
    <Container>
      <Modal opened={opened} centered onClose={close} title="회원 탈퇴" style={{ marginTop: '10rem' }}>
        <Flex direction={'column'} gap={20}>
          <Text> 계정 삭제시 회원님의 유니버스가 삭제되며 복구 불가능합니다.</Text>
          <Checkbox onChange={event => setChecked(!event.currentTarget.checked)} label="이에 동의하십니까?" />
          <Flex gap={3}>
            <Button fullWidth variant="outline">
              취소하기
            </Button>
            <Button fullWidth variant="outline" disabled={checked}>
              탈퇴하기
            </Button>
          </Flex>
        </Flex>
      </Modal>
      <Flex gap={50}>
        <Title order={5}>회원탈퇴</Title>
        <Button onClick={open} variant="outline"></Button>
      </Flex>
    </Container>
  );
};

export default DeleteUser;
