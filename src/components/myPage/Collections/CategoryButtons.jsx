import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMediaQuery } from '@mantine/hooks';
import { Flex } from '@mantine/core';
import { COLLECTION_BUTTON } from '../../../constants';
import { CategoryButton } from '.';
import { categoryState, selectedItemState } from '../../../recoil/atom';
import selectedItemImgState from '../../../recoil/atom/selectedItemImgState';

const CategoryButtons = () => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  const [category, setCategory] = useRecoilState(categoryState);
  const setSelectedItem = useSetRecoilState(selectedItemState);
  const setSelectedItemImg = useSetRecoilState(selectedItemImgState);

  const changeCategory = (e, button) => {
    if (`${e.target.textContent.toLowerCase()}` === category) return;
    setCategory(`${button.label.toLowerCase()}`);
    setSelectedItem(null);
    setSelectedItemImg(null);
  };

  return (
    <Flex gap={smallScreen ? 8 : 12}>
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
