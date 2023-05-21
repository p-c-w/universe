import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { Title, Text, Accordion } from '@mantine/core';
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
  const [editMode, setEditMode] = useState(false);

  const providers = subscribeList.map(({ id }) => id);
  const currentFee = useMemo(() => getCurrentFee(providers), [providers]);

  return (
    <PresentSubscriptionFee>
      <Accordion.Item value={`₩${currentFee}`}>
        <Accordion.Control
          onClick={() => {
            setEditMode(false);
          }}>
          <Title order={4} size={18}>
            현재 나의 구독료
          </Title>
          <Text size={32}>₩{currentFee.toLocaleString()}</Text>
        </Accordion.Control>
        <Accordion.Panel>
          {editMode ? (
            <Editor
              providers={providers}
              toggleEditMode={() => {
                setEditMode(false);
              }}
            />
          ) : (
            <ProvidersInfo
              providers={providers}
              toggleEditMode={() => {
                setEditMode(true);
              }}
            />
          )}
        </Accordion.Panel>
      </Accordion.Item>
    </PresentSubscriptionFee>
  );
};

export default React.memo(Fee);
