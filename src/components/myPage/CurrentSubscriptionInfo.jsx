import { useState } from 'react';
import styled from '@emotion/styled';
import { Title, Text, Accordion, Box, Container } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { ProviderBadges, SubscriptionProviders, SubscriptionEditor } from './index';
import { PROVIDERS } from '../../constants';
import { userState } from '../../recoil/atom';
import { useProviderQueries } from '../../hooks/queries';
import { getProvidersInfoListByList, getProvidersByList, getProvidersByIds } from '../../utils';

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

const getCurrentFee = list => list?.map(item => item.fee).reduce((acc, current) => acc + current, 0);

const CurrentSubscriptionInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const { subscribe_list: subscribeList, watch_list: watchList } = useRecoilValue(userState);
  const { providers: whatchProvidersWithContenId } = useProviderQueries(watchList, {
    select: data => ({ id: data.id, providers: data.results.KR.flatrate }),
  });

  const subscribeProviderIds = getProvidersByList(subscribeList);
  const whatchProviderIds = whatchProvidersWithContenId.flatMap(content => content.providers);
  const unWatchedProviderIds = subscribeProviderIds.filter(
    subscribeProviderId => !whatchProviderIds.includes(subscribeProviderId)
  );
  const unWatchedProvidersInfoList = getProvidersByIds(unWatchedProviderIds);

  const providers = getProvidersInfoListByList(subscribeList);
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
        {unWatchedProvidersInfoList.length ? (
          <>
            <Title order={5} mb={10}>
              구독하고 있지만 보고 있지 않아요
            </Title>
            <ProviderBadges providers={unWatchedProvidersInfoList} />
          </>
        ) : (
          <Title order={5} mb={10}>
            구독중인 모든 서비스를 사용하고 있어요
          </Title>
        )}
      </Box>
    </StyledContainer>
  );
};

export default CurrentSubscriptionInfo;
