import { Avatar, Tooltip } from '@mantine/core';

const Badges = ({ providers, spacing = 'sm', size = '2.2rem' }) => (
  <Tooltip.Group openDelay={100} closeDelay={100}>
    <Avatar.Group spacing={spacing}>
      {providers?.map(item => (
        <Tooltip
          key={item.id}
          label={item.provider_name}
          color="gray"
          withArrow
          transitionProps={{ transition: 'fade', duration: 300 }}>
          <Avatar src={item.providerImgPath} radius="xl" size={size} />
        </Tooltip>
      ))}
    </Avatar.Group>
  </Tooltip.Group>
);

export default Badges;