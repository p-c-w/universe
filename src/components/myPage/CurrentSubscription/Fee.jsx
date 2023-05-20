import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Title, Text, Accordion } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PROVIDERS } from '../../../constants';
import { ProvidersInfo, Editor } from '.';

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
          <Title order={4} size={smallScreen ? 17 : 18}>
            현재 나의 구독료
          </Title>
          <Text size={smallScreen ? 30 : 32}>₩{currentFee.toLocaleString()}</Text>
        </Accordion.Control>
        <Accordion.Panel>
          {editMode ? (
            <Editor providers={providers} onClick={toggleEditMode} />
          ) : (
            <ProvidersInfo providers={providers} onClick={toggleEditMode} />
          )}
        </Accordion.Panel>
      </Accordion.Item>
    </PresentSubscriptionFee>
  );
};

export default React.memo(Fee);
