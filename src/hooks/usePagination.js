import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, selectedItemState } from '../recoil/atom';
import { PAGE_LIMIT } from '../constants';

const usePagination = data => {
  const selectedCategory = useRecoilValue(categoryState);
  const setSelectedItem = useSetRecoilState(selectedItemState);

  const [activePage, setActivePage] = useState(1);
  const offset = (activePage - 1) * PAGE_LIMIT;
  const total = Math.ceil(data.length / 5);
  const collection = data.slice(offset, offset + PAGE_LIMIT);

  useEffect(() => {
    setActivePage(1);
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedItem('');
  }, [activePage, setSelectedItem]);

  return { activePage, setActivePage, total, collection };
};

export default usePagination;
