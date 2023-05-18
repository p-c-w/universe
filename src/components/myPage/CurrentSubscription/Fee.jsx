import { useState } from 'react';
import styled from '@emotion/styled';
import { Title, Text, Accordion } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PROVIDERS } from '../../../constants';
import { SubscriptionProviders, SubscriptionEditor } from '.';

const PresentSubscriptionFee = styled(Accordion)`
  .mantine-Accordion-item {
    border-bottom: none;
  }
  .mantine-Accordion-label {
    padding: 0;
  }
  .mantine-Accordion-control {
    padding: 0;
    :active {
      background-color: inherit;
    }
  }
`;

const getCurrentFee = list => list?.map(id => PROVIDERS[id].fee.basic).reduce((acc, current) => acc + current, 0);

const Fee = ({ subscribeList }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');
  const xsmallScreen = useMediaQuery('(max-width: 30rem)');

  const [editMode, setEditMode] = useState(false);

  const providers = subscribeList.map(({ id }) => id);
  const currentFee = getCurrentFee(providers);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <PresentSubscriptionFee>
      <Accordion.Item value={`₩${currentFee}`}>
        <Accordion.Control
          onClick={() => {
            setEditMode(false);
          }}>
          <Title order={4} size={xsmallScreen ? 16 : smallScreen ? 17 : 18}>
            현재 나의 구독료
          </Title>
          <Text size={xsmallScreen ? 28 : smallScreen ? 30 : 32}>₩{currentFee.toLocaleString()}</Text>
        </Accordion.Control>
        <Accordion.Panel>
          {editMode ? (
            <SubscriptionEditor providers={providers} onClick={toggleEditMode} />
          ) : (
            <SubscriptionProviders providers={providers} onClick={toggleEditMode} />
          )}
        </Accordion.Panel>
      </Accordion.Item>
    </PresentSubscriptionFee>
  );
};

export default Fee;
