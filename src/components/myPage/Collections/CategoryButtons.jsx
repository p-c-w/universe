import { useRecoilState } from 'recoil';
import { Flex } from '@mantine/core';
import { COLLECTION_BUTTON } from '../../../constants';
import { CategoryButton } from '.';
import { categoryState } from '../../../recoil/atom';

const CategoryButtons = () => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);

  const isSelected = ({ label }) => selectedCategory === `${label.toLowerCase()}`;

  const changeCategory = button => {
    if (isSelected(button)) return;
    setSelectedCategory(`${button.label.toLowerCase()}`);
  };

  return (
    <Flex gap={12}>
      {COLLECTION_BUTTON.map(button => (
        <CategoryButton
          key={button.label}
          onClick={() => changeCategory(button)}
          selected={isSelected(button)}
          {...button}>
          {button.label}
        </CategoryButton>
      ))}
    </Flex>
  );
};

export default CategoryButtons;
