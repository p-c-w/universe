import { Avatar, Tooltip } from '@mantine/core';
import { PROVIDERS } from '../../constants';

const Badges = ({ providerIds, spacing = 'sm', size = '2.2rem' }) => (
  <Tooltip.Group openDelay={100} closeDelay={100}>
    <Avatar.Group spacing={spacing}>
      {providerIds?.map(id => (
        <Tooltip
          key={PROVIDERS[id].provider_name}
          label={PROVIDERS[id].provider_name}
          color="gray"
          withArrow
          transitionProps={{ transition: 'fade', duration: 300 }}>
          <Avatar src={PROVIDERS[id].providerImgPath} radius="xl" size={size} />
        </Tooltip>
      ))}
    </Avatar.Group>
  </Tooltip.Group>
);

export default Badges;
