import { useState } from 'react';
import styled from '@emotion/styled';
import { Title, Text, Accordion, Box, Container } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { ProviderBadges, SubscriptionProviders, SubscriptionEditor } from './index';
import { PROVIDERS } from '../../constants';
import { userState } from '../../recoil/atom';

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

const getProviderList = list => {
  const providers = list?.map(item => PROVIDERS.find(PROVIDER => PROVIDER.id === item.id));
  return providers;
};

const getCurrentFee = list => list?.map(item => item.fee).reduce((acc, current) => acc + current, 0);

const CurrentSubscriptionInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const { subscribe_list: subscribeList } = useRecoilValue(userState);

  const providers = getProviderList(subscribeList);
  const currentFee = getCurrentFee(providers);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <StyledContainer>
      <PresentSubscriptionFee styles={{ item: { borderBottom: 'none' }, label: { padding: '0' } }}>
        <Accordion.Item value={`₩${currentFee}`}>
          <Accordion.Control>
            <Title order={4}>현재 나의 구독료</Title>
            <Text size="2rem">₩{currentFee}</Text>
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
