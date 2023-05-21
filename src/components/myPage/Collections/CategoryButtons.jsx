import { useRecoilState } from 'recoil';
import { Flex } from '@mantine/core';
import { COLLECTION_BUTTON } from '../../../constants';
import { CategoryButton } from '.';
import { categoryState } from '../../../recoil/atom';

const CategoryButtons = () => {
  const [category, setCategory] = useRecoilState(categoryState);

  const changeCategory = (e, button) => {
    if (`${e.target.textContent.toLowerCase()}` === category) return;
    setCategory(`${button.label.toLowerCase()}`);
  };

  return (
    <Flex gap={12}>
      {COLLECTION_BUTTON.map(button => (
        <CategoryButton
          key={button.label}
          onClick={e => changeCategory(e, button)}
          selected={category === `${button.label.toLowerCase()}`}
          {...button}>
          {button.label}
        </CategoryButton>
      ))}
    </Flex>
  );
};

export default CategoryButtons;
