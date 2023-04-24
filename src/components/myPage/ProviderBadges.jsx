import { Flex, Badge } from '@mantine/core';

const mockData = [
  {
    id: 8,
    provider_name: 'Netflix',
  },
  {
    id: 119,
    provider_name: 'Amazon Prime Video',
  },
  {
    id: 337,
    provider_name: 'Disney Plus',
  },
  {
    id: 356,
    provider_name: 'wavve',
  },
  {
    id: 97,
    provider_name: 'Watcha',
  },
  {
    id: 350,
    provider_name: 'Apple TV Plus',
  },
];

const SubscribeBadges = ({ providers = mockData }) => {
  console.log();
  return (
    <>
      <Flex gap={3} wrap="wrap">
        {providers.map(provider => (
          <Badge key={provider.id} size="lg">
            {provider.provider_name}
          </Badge>
        ))}
      </Flex>
    </>
  );
};

export default SubscribeBadges;
