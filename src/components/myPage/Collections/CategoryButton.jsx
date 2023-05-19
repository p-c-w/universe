import { Button, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const CategoryButton = ({ description, color, selected, children, onClick }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  return (
    <Tooltip label={description}>
      <Button
        radius="xl"
        color={color}
        variant={selected ? 'filled' : 'light'}
        onClick={onClick}
        size={smallScreen ? 'xs' : 'sm'}>
        {children}
      </Button>
    </Tooltip>
  );
};

export default CategoryButton;
