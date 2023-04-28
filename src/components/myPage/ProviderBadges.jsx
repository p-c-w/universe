import { Flex, Badge } from '@mantine/core';
import { PROVIDERS } from '../../constants';

const ProviderBadges = ({ providers = PROVIDERS, variant }) => (
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
