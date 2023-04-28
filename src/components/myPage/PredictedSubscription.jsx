import { Title, Text, Flex, Container, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { Badges } from '../index';
import userState from '../../recoil/atom/userState';

import { useProviderQueries } from '../../hooks/queries';
import calculateLowestFee from '../../utils/calculateLowestFee';

const PredictedSubscription = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const theme = useMantineTheme();

  const user = useRecoilValue(userState);

  const userCollectionList = user.watch_list.map(list => ({ id: list.id, type: list.type }));

  const { providers } = useProviderQueries(userCollectionList, {
    select: data => ({ id: data.id, providers: data.results.KR.flatrate ?? [] }),
  });

  const { cheapestPrice } = calculateLowestFee(providers);

  return (
    <Container m={0} p={0}>
      <Flex align="center" gap={20}>
        <Title order={2} size={30} align="left">
          예상 구독료
        </Title>
        <Badges size="2rem" />
      </Flex>
      <Text
        fz="3.5rem"
        color={dark ? theme.colors[theme.primaryColor][2] : theme.colors[theme.primaryColor][9]}
        fw={500}>
        ₩{cheapestPrice}
      </Text>
    </Container>
  );
};

export default PredictedSubscription;
