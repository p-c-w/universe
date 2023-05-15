import { useState } from 'react';
import styled from '@emotion/styled';
import { Title, Text, Accordion, Container } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SubscriptionProviders, SubscriptionEditor, CurrentUnsubscriptionInfo } from './index';
import { useUserQuery } from '../../hooks/queries';
import { getProvidersInfoListByList } from '../../utils';

const StyledContainer = styled(Container)`
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2])};
  border-radius: 0.5rem;
`;

const PresentSubscriptionFee = styled(Accordion)`
  .mantine-Accordion-item {
    border-bottom: none;
  }
  .mantine-Accordion-label {
    padding: 0;
  }
  .mantine-Accordion-control {
    padding: 0;
  }
`;

const getUserInfo = userInfo => ({
  subscribeList: userInfo.subscribe_list,
  watchList: userInfo.watch_list,
});

const defaultData = {
  subscribeList: [],
  watchList: [],
};

const getCurrentFee = list => list?.map(item => item.fee).reduce((acc, current) => acc + current, 0);

const CurrentSubscriptionInfo = () => {
  const xsmallScreen = useMediaQuery('(max-width: 30rem)');

  const [editMode, setEditMode] = useState(false);

  const { data } = useUserQuery({
    select: getUserInfo,
  });
  const { subscribeList, watchList } = data || defaultData;

  const providers = getProvidersInfoListByList(subscribeList);
  const currentFee = getCurrentFee(providers);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <StyledContainer p={16}>
      <PresentSubscriptionFee>
        <Accordion.Item value={`₩${currentFee}`}>
          <Accordion.Control
            onClick={() => {
              setEditMode(false);
            }}>
            <Title order={4} size={xsmallScreen ? 16 : 18}>
              현재 나의 구독료
            </Title>
            <Text size={xsmallScreen ? 28 : 32}>₩{currentFee.toLocaleString()}</Text>
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
      <CurrentUnsubscriptionInfo subscribeList={subscribeList} watchList={watchList} />
    </StyledContainer>
  );
};

export default CurrentSubscriptionInfo;
