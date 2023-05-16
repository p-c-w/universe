import { Flex, Badge } from '@mantine/core';
import styled from '@emotion/styled';

const StyledBadge = styled(Badge)``;

const ProviderBadges = ({ providers, variant, size = 'lg' }) => (
  <>
    <Flex gap={3} wrap="wrap">
      {providers?.map(provider => (
        <StyledBadge key={provider.id} size={size} variant={variant} color={`${provider.provider_name}`}>
          {provider.provider_name}
        </StyledBadge>
      ))}
    </Flex>
  </>
);

export default ProviderBadges;
