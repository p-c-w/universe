import React from 'react';
import { Container, Title, Text, Flex, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Badges } from '../common';

import { useProviderQueries } from '../../hooks/queries';
import { PROVIDERS } from '../../constants';

import calculateLowestFee from '../../utils/calculateLowestFee';

const PredictedSubscription = ({ watchlist, userCollectionList }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');
  const xsmallScreen = useMediaQuery('(max-width: 30rem)');

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const theme = useMantineTheme();

  const queries = useProviderQueries(userCollectionList, {
    select: data => ({
      id: data.id,
      providers: data.results.KR
        ? data.results.KR.flatrate
            ?.map(provider => provider.provider_id)
            ?.filter(id => Object.prototype.hasOwnProperty.call(PROVIDERS, id))
        : [],
    }),
    enabled: !!watchlist.length,
  });

  const providers = queries.map(({ data }) => data).filter(({ providers }) => providers !== undefined);

  const { cheapestCombo, cheapestPrice } = calculateLowestFee(providers);

  return (
    <Container m={0} p={0}>
      <Flex align="center" gap={20}>
        <Title order={2} size={xsmallScreen ? 25 : smallScreen ? 28 : 30} align="left">
          똑똑한 구독료
        </Title>
        <Badges providers={cheapestCombo} size={xsmallScreen ? 30 : 32} />
      </Flex>
      <Text
        fz={xsmallScreen ? 48 : smallScreen ? 53 : 56}
        color={dark ? theme.colors[theme.primaryColor][2] : theme.colors[theme.primaryColor][9]}
        fw={500}>
        ₩{cheapestPrice.toLocaleString()}
      </Text>
      <Text fz={xsmallScreen ? 9 : smallScreen ? 10 : 12} fw={100} m={10}>
        * universe에서 제공하지 않는 OTT 서비스의 구독료는 포함되지 않습니다.{' '}
      </Text>
    </Container>
  );
};

export default PredictedSubscription;
