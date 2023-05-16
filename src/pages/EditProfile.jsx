import React from 'react';
import { Container } from '@mantine/core';
import { GlobalShell } from '../components/common';
import { EditprofileTitle, EditPassword } from '../components/editProfile';

const EditProfile = () => {
  return (
    <GlobalShell>
      <Container mt="1rem" mx="auto" size={'100%'} w={1240} miw={375}>
        <EditprofileTitle />
        <EditPassword />
      </Container>
    </GlobalShell>
  );
};

export default EditProfile;
