import { useState } from 'react';
import styled from '@emotion/styled';
import { Title, Text, Accordion, Box, Container } from '@mantine/core';
import { ProviderBadges, SubscriptionProviders, ProviderChips } from './index';

const StyledContainer = styled(Container)`
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1])};
  border-radius: 0.5rem;
  padding: 1rem;
`;

const PresentSubscriptionFee = styled(Accordion)`
  /* border-bottom: 1px solid white; */

  button {
    padding: 0;
  }
`;

const CurrentSubscriptionInfo = () => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <StyledContainer>
      <PresentSubscriptionFee styles={{ item: { borderBottom: 'none' }, label: { padding: '0' } }}>
        <Accordion.Item value="₩29,800">
          <Accordion.Control>
            <Title order={4}>현재 나의 구독료</Title>
            <Text size="2rem">₩29,800</Text>
          </Accordion.Control>
          <Accordion.Panel>
            {editMode ? <ProviderChips onClick={toggleEditMode} /> : <SubscriptionProviders onClick={toggleEditMode} />}
          </Accordion.Panel>
        </Accordion.Item>
      </PresentSubscriptionFee>
      <Box mt={16}>
        <Title order={5} mb={10}>
          구독하고 있지만 보고 있지 않아요
        </Title>
        <ProviderBadges />
      </Box>
    </StyledContainer>
  );
};

export default CurrentSubscriptionInfo;
