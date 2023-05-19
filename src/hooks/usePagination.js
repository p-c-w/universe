import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { categoryState } from '../recoil/atom';
import { PAGE_LIMIT } from '../constants';

const usePagination = data => {
  const category = useRecoilValue(categoryState);

  const [activePage, setActivePage] = useState(1);
  const offset = (activePage - 1) * PAGE_LIMIT;
  const total = Math.ceil(data.length / 5);
  const collection = data.slice(offset, offset + PAGE_LIMIT);

  useEffect(() => {
    setActivePage(1);
  }, [category]);

  return { activePage, setActivePage, total, collection };
};

export default usePagination;
