import { Flex, Badge, useMantineColorScheme } from '@mantine/core';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { PROVIDERS } from '../../constants';

const StyledBadge = styled(Badge)``;

const ProviderBadges = ({ providers, variant }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <>
      <Flex gap={3} wrap="wrap">
        {providers?.map(provider => (
          <StyledBadge
            key={provider.id}
            size="lg"
            variant={variant}
            bg={!variant && PROVIDERS[provider.id].color}
            c={provider.id === 350 ? 'gray.7' : variant ? PROVIDERS[provider.id].color : 'white'}>
            {provider.provider_name}
          </StyledBadge>
        ))}
      </Flex>
    </>
  );
};

export default ProviderBadges;
