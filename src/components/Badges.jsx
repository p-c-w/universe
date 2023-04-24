import { Avatar, Tooltip } from '@mantine/core';

const mockData = [
  {
    id: '507129',
    providerImg: 'assets/badges/appletvplus.svg',
    provider: 'Apple TV+',
  },
  {
    id: '37692',
    providerImg: 'assets/badges/disneyplus.svg',
    provider: 'Disney+',
  },
  {
    id: '54823',
    providerImg: 'assets/badges/wavve.svg',
    provider: 'Wavve',
  },
];

const Badges = () => (
  <Tooltip.Group openDelay={100} closeDelay={100}>
    <Avatar.Group spacing="sm" styles={{}}>
      {mockData.map(item => (
        <Tooltip
          key={item.id}
          label={item.provider}
          color="gray"
          withArrow
          transitionProps={{ transition: 'fade', duration: 300 }}>
          <Avatar src={item.providerImg} radius="xl" size="1.8rem" />
        </Tooltip>
      ))}
    </Avatar.Group>
  </Tooltip.Group>
);

export default Badges;
