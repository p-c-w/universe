import { Flex, Badge } from '@mantine/core';

const ProviderBadges = ({ providers, variant }) => (
  <>
    <Flex gap={3} wrap="wrap">
      {providers?.map(provider => (
        <Badge key={provider.id} size="lg" variant={variant}>
          {provider.provider_name}
        </Badge>
      ))}
    </Flex>
  </>
);

export default ProviderBadges;
