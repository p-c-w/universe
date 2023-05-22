import { Container, Title, Text, Flex, useMantineColorScheme } from '@mantine/core';
import { ProviderAvatars } from '../../common';
import { useProviderQueries, useUserQuery } from '../../../hooks/queries';
import { calculateLowestFee } from '../../../utils';
import { SuggestedSubscriptionSkeleton } from '../../../loaders';

const SuggestedSubscription = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const { userInfo: watchList } = useUserQuery({
    select: userInfo => userInfo.watch_list,
    refetchOnWindowFocus: false,
  });

  const userCollectionList = watchList.map(list => ({ type: list.type, id: list.id }));

  const { queries, isAllSuccess } = useProviderQueries(userCollectionList, {
    enabled: !!watchList,
  });

  if (!isAllSuccess) return <SuggestedSubscriptionSkeleton />;

  const providers = queries.map(({ data }) => data).filter(({ providers }) => providers !== undefined);

  const { cheapestCombo: providerIds, cheapestPrice } = calculateLowestFee(providers);

  return (
    <Container m={0} p={0}>
      <Flex align="center" gap={20}>
        <Title order={2} size={30} align="left">
          똑똑한 구독료
        </Title>
        {providerIds && <ProviderAvatars providerIds={providerIds} size={32} />}
      </Flex>
      <Text fz={56} color={dark ? 'violet.2' : 'violet.9'} fw={500}>
        ₩{cheapestPrice?.toLocaleString()}
      </Text>
      <Text fz={12} fw={100} m={10}>
        * universe에서 제공하지 않는 OTT 서비스의 구독료는 포함되지 않습니다.
      </Text>
    </Container>
  );
};

export default SuggestedSubscription;
