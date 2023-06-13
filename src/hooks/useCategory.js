import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { categoryState, selectedItemState } from '../recoil/atom';

const useCategory = () => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);

  useEffect(() => {
    if (selectedItem === '') setSelectedItem('');
  }, [selectedItem, selectedCategory, setSelectedItem]);

  return [selectedCategory, setSelectedCategory];
};

export default useCategory;
