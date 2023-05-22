import { Container, Flex, Skeleton, Group } from '@mantine/core';

const SuggestedSubscriptionSkeleton = () => (
  <>
    <Container m={0} p={0} width="100%">
      <Flex align="center" gap={20}>
        <Skeleton width={172} height={40} />
        <Group gap={-2}>
          <Skeleton circle height={32} />
          <Skeleton circle height={32} />
          <Skeleton circle height={32} />
        </Group>
      </Flex>
      <Skeleton width="100%" height={76} mt={10} />
      <Skeleton width="95%" height={19} m={10} />
    </Container>
  </>
);

export default SuggestedSubscriptionSkeleton;
