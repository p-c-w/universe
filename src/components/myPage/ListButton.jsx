import { Button, Tooltip, useMantineColorScheme } from '@mantine/core';

const ListButton = ({ tooltip, children }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Tooltip label={tooltip}>
      <Button radius="xl" color={dark ? '' : 'gray'}>
        {children}
      </Button>
    </Tooltip>
  );
};

export default ListButton;
