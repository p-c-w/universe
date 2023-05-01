import React from 'react';
import { Container, Title, Text, Flex, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { Badges } from '../index';

import { useProviderQueries } from '../../hooks/queries';
import PROVIDERS from '../../constants/providers';

import calculateLowestFee from '../../utils/calculateLowestFee';

const PredictedSubscription = ({ watchlist, userCollectionList }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const theme = useMantineTheme();

  const queries = useProviderQueries(userCollectionList, {
    select: data => ({
      id: data.id,
      providers: data.results.KR.flatrate
        ?.map(provider => provider.provider_id)
        ?.filter(id => Object.prototype.hasOwnProperty.call(PROVIDERS, id)),
    }),
    enabled: !!watchlist.length,
  });

  const providers = queries.map(({ data }) => data).filter(({ providers }) => providers !== undefined);

  const { cheapestCombo, cheapestPrice } = calculateLowestFee(providers);

  return (
    <>
      <Container m={0} p={0}>
        <Flex align="center" gap={20}>
          <Title order={2} size={30} align="left">
            예상 구독료
          </Title>
          <Badges providers={cheapestCombo} size="2rem" />
        </Flex>
        <Text
          fz="3.5rem"
          color={dark ? theme.colors[theme.primaryColor][2] : theme.colors[theme.primaryColor][9]}
          fw={500}>
          ₩{cheapestPrice.toLocaleString()}
        </Text>
      </Container>
    </>
  );
};

export default PredictedSubscription;
