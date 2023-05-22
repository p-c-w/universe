import { Box, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ProviderBadges } from '.';
import { useProviderQueries } from '../../../hooks/queries';

const getProvidersIdsByList = list => list.flatMap(item => item.id);

const Unsubscriptions = ({ subscribeList, watchList }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  const { queries, isAllSuccess } = useProviderQueries(watchList, {
    enabled: !!watchList.length,
  });

  if (!isAllSuccess) return <div>...isLoading</div>;

  const subscribeProviderIds = getProvidersIdsByList(subscribeList);
  const watchProviderIds = queries.map(({ data }) => data).flatMap(content => content?.providers);
  const unWatchedProviderIds = subscribeProviderIds?.filter(id => !watchProviderIds.includes(id));

  return (
    <Box mt={16} w="100%">
      {subscribeProviderIds.length === 0 ? (
        <Title order={4} mb={10} fz={16}>
          현재 구독 중인 서비스가 없어요
        </Title>
      ) : unWatchedProviderIds.length !== 0 ? (
        <>
          <Title order={4} mb={10} fz={16}>
            구독하고 있지만 보고 있지 않아요
          </Title>
          {unWatchedProviderIds.length !== 0 && (
            <ProviderBadges providerIds={unWatchedProviderIds} size={smallScreen ? 'md' : 'lg'} />
          )}
        </>
      ) : (
        <Title order={4} mb={10} fz={16}>
          구독중인 모든 서비스를 사용하고 있어요
        </Title>
      )}
    </Box>
  );
};

export default Unsubscriptions;
