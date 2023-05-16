import { useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useRecoilValue } from 'recoil';
import { sideNavState, categoryState } from '../recoil/atom';

const useSelectedItem = (setSelectedItem, setItemSelected, selectedItem) => {
  const middleScreen = useMediaQuery('(max-width: 51.25rem)');

  const category = useRecoilValue(categoryState);
  const isNavOpened = useRecoilValue(sideNavState);

  useEffect(() => {
    setSelectedItem(null);
  }, [category]);

  useEffect(() => {
    if (middleScreen && isNavOpened) {
      setItemSelected(false);
    }
  }, [middleScreen]);

  useEffect(() => {
    if (!middleScreen && selectedItem && isNavOpened) {
      setItemSelected(true);
    }
  }, [middleScreen]);

  return middleScreen;
};

export default useSelectedItem;
