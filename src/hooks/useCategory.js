import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { categoryState, selectedItemState } from '../recoil/atom';

const useCategory = () => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);
  const setSelectedItem = useSetRecoilState(selectedItemState);

  useEffect(() => {
    setSelectedItem('');
  }, [selectedCategory, setSelectedItem]);

  return [selectedCategory, setSelectedCategory];
};

export default useCategory;
