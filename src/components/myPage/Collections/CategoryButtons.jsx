import { useRecoilState } from 'recoil';
import { Flex, Button, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { COLLECTION_BUTTON } from '../../../constants';
import { categoryState } from '../../../recoil/atom';

const CategoryButtons = () => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);

  const isSelected = category => selectedCategory === category;

  return (
    <Flex gap={12}>
      {selectedCategory &&
        COLLECTION_BUTTON.map(({ label, category, description, color }) => (
          <Tooltip key={label} label={description}>
            <Button
              radius="xl"
              color={color}
              variant={isSelected(category) ? 'filled' : 'light'}
              onClick={() => {
                setSelectedCategory(category);
              }}
              size={smallScreen ? 'xs' : 'sm'}>
              {label}
            </Button>
          </Tooltip>
        ))}
    </Flex>
  );
};

export default CategoryButtons;
