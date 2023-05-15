import { Button, Tooltip, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const CollectionCategoryButton = ({ tooltip, selected, children, onClick }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const dark = colorScheme === 'dark';

  const smallScreen = useMediaQuery('(max-width: 48rem)');

  return (
    <Tooltip label={tooltip}>
      <Button
        radius="xl"
        color={dark && selected ? theme.primaryColor : dark && !selected ? 'violet.3' : selected ? 'gray.7' : 'gray.6'}
        onClick={onClick}
        size={smallScreen ? 'xs' : 'sm'}>
        {children}
      </Button>
    </Tooltip>
  );
};

export default CollectionCategoryButton;
