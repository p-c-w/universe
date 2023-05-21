import { useMemo } from 'react';
import { Container, Title, Text, Flex, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Badges } from '../../common';
import { useProviderQueries, useUserQuery } from '../../../hooks/queries';
import { calculateLowestFee } from '../../../utils';

const SuggestedSubscription = () => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const { userInfo: watchList } = useUserQuery({
    select: userInfo => userInfo.watch_list,
    refetchOnWindowFocus: false,
  });

  const userCollectionList = watchList.map(list => ({ type: list.type, id: list.id }));

  const queries = useProviderQueries(userCollectionList, {
    enabled: !!watchList,
  });

  const providers = queries.map(({ data }) => data).filter(({ providers }) => providers !== undefined);

  const { cheapestCombo: providerIds, cheapestPrice } = useMemo(() => calculateLowestFee(providers), [providers]);

  // 숫자 올라가는 기능 구현
  return (
    <Container m={0} p={0}>
      <Flex align="center" gap={20}>
        <Title order={2} size={smallScreen ? 28 : 30} align="left">
          똑똑한 구독료
        </Title>
        <Badges providerIds={providerIds} size={32} />
      </Flex>
      <Text fz={smallScreen ? 53 : 56} color={dark ? 'violet.2' : 'violet.9'} fw={500}>
        ₩{cheapestPrice.toLocaleString()}
      </Text>
      <Text fz={smallScreen ? 10 : 12} fw={100} m={10}>
        * universe에서 제공하지 않는 OTT 서비스의 구독료는 포함되지 않습니다.
      </Text>
    </Container>
  );
};

export default SuggestedSubscription;
