import { Flex, Badge } from '@mantine/core';
import { PROVIDERS } from '../../../constants';

const ProviderBadges = ({ providerIds, variant, size = 'lg' }) => (
  <>
    <Flex gap={3} wrap="wrap">
      {providerIds?.map(id => (
        <Badge key={PROVIDERS[id].provider_name} size={size} variant={variant} color={`${PROVIDERS[id].provider_name}`}>
          {PROVIDERS[id].provider_name}
        </Badge>
      ))}
    </Flex>
  </>
);

export default ProviderBadges;
