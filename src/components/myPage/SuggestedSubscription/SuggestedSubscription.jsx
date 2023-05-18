import { Container, Title, Text, Flex, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Badges } from '../../common';
import { useProviderQueries, useUserQuery } from '../../../hooks/queries';
import calculateLowestFee from '../../../utils/calculateLowestFee';

const SuggestedSubscription = () => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const theme = useMantineTheme();

  const { userInfo } = useUserQuery({
    select: userInfo => ({
      watchlist: userInfo.watch_list,
      refetchOnWindowFocus: false,
    }),
  });

  const { watchlist = [] } = userInfo;

  const userCollectionList = watchlist?.map(list => ({ type: list.type, id: list.id }));

  const queries = useProviderQueries(userCollectionList, {
    enabled: !!watchlist.length,
  });

  const providers = queries.map(({ data }) => data).filter(({ providers }) => providers !== undefined);

  const { cheapestCombo: providerIds, cheapestPrice } = calculateLowestFee(providers);

  return (
    <Container m={0} p={0}>
      <Flex align="center" gap={20}>
        <Title order={2} size={smallScreen ? 28 : 30} align="left">
          똑똑한 구독료
        </Title>
        <Badges providerIds={providerIds} size={32} />
      </Flex>
      <Text
        fz={smallScreen ? 53 : 56}
        color={dark ? theme.colors[theme.primaryColor][2] : theme.colors[theme.primaryColor][9]}
        fw={500}>
        ₩{cheapestPrice.toLocaleString()}
      </Text>
      <Text fz={smallScreen ? 10 : 12} fw={100} m={10}>
        * universe에서 제공하지 않는 OTT 서비스의 구독료는 포함되지 않습니다.{' '}
      </Text>
    </Container>
  );
};

export default SuggestedSubscription;
