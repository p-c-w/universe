import { useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useRecoilValue } from 'recoil';
import { sideNavState, categoryState } from '../recoil/atom';

const useSelectedItem = (setSelectedItem, setIsItemSelected, selectedItem) => {
  const middleScreen = useMediaQuery('(max-width: 51.25rem)');

  const category = useRecoilValue(categoryState);
  const isNavOpened = useRecoilValue(sideNavState);

  useEffect(() => {
    setSelectedItem(null);
  }, [category]);

  useEffect(() => {
    if (middleScreen && isNavOpened) {
      setIsItemSelected(false);
    }
  }, [middleScreen, isNavOpened]);

  useEffect(() => {
    if (!middleScreen && selectedItem && isNavOpened) {
      setIsItemSelected(true);
    }
  }, [middleScreen]);

  useEffect(() => {
    if (middleScreen && selectedItem && !isNavOpened) {
      setIsItemSelected(true);
    }
  }, [isNavOpened]);

  return middleScreen;
};

export default useSelectedItem;
