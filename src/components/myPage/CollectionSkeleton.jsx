import { Flex, Skeleton } from '@mantine/core';

const CollectionSkeleton = () =>
  Array.from({ length: 5 }, (_, i) => (
    <Flex key={i} direction="row" justify="flex-start" gap="md" p={10} w="inherit">
      <Skeleton height={50} circle mb="xl" />
      <Flex direction="column" justify="flex-start" align="flex-start">
        <Skeleton height={10} width={200} radius="xl" />
        <Skeleton height={8} mt={10} width={100} radius="xl" />
        <Skeleton height={8} mt={6} width={70} radius="xl" />
      </Flex>
    </Flex>
  ));

export default CollectionSkeleton;
