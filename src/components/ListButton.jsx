import { Button, Tooltip } from '@mantine/core';

const ListButton = ({ tooltip, children }) => {
  console.log();
  return (
    <Tooltip label={tooltip}>
      <Button radius="xl">{children}</Button>
    </Tooltip>
  );
};

export default ListButton;
