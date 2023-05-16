import React from 'react';
import { Title, Container, Text } from '@mantine/core';

const EditprofileTitle = () => {
  return (
    <Container my={20}>
      <Title order={1}>나의 프로필 수정</Title>
      <Text>유니버스 대표 프로필과 별명 및 비밀번호를 수정 하실 수 있습니다.</Text>
    </Container>
  );
};

export default EditprofileTitle;
