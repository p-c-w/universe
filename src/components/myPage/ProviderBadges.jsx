import { Flex, Badge } from '@mantine/core';
import styled from '@emotion/styled';
import { PROVIDERS } from '../../constants';

// const StyledBadge = styled(Badge)`

// `;

const ProviderBadges = ({ providers, variant }) => (
  <>
    <Flex gap={3} wrap="wrap">
      {providers?.map(provider => (
        <Badge key={provider.id} size="lg" variant={variant} bg={PROVIDERS[provider.id].color} c={'white'}>
          {provider.provider_name}
        </Badge>
      ))}
    </Flex>
  </>
);

export default ProviderBadges;
