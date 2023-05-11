import { Box, Title } from '@mantine/core';
import { ProviderBadges } from './index';
import { getProvidersIdsByList, getProvidersByIds } from '../../utils';
import { PROVIDERS } from '../../constants';
import { useProviderQueries } from '../../hooks/queries';

const CurrentUnsubscriptionInfo = ({ subscribeList, watchList }) => {
  const queries = useProviderQueries(watchList, {
    select: data => ({
      id: data.id,
      providers: data.results.KR?.flatrate
        ?.map(provider => provider.provider_id)
        ?.filter(id => Object.prototype.hasOwnProperty.call(PROVIDERS, id)),
    }),
    enabled: !!watchList.length,
  });

  const subscribeProviderIds = getProvidersIdsByList(subscribeList);

  const whatchProviderIds = queries.map(({ data }) => data).flatMap(content => content?.providers);
  const unWatchedProviderIds = subscribeProviderIds?.filter(id => !whatchProviderIds.includes(id));

  const unWatchedProvidersInfoList = getProvidersByIds(unWatchedProviderIds);

  return (
    <Box mt={16}>
      {!subscribeProviderIds.length ? (
        <Title order={5} mb={10}>
          현재 구독 중인 서비스가 없어요
        </Title>
      ) : unWatchedProvidersInfoList?.length ? (
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
  );
};

export default CurrentUnsubscriptionInfo;
