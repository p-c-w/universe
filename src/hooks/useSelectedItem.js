import { useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedItemState, sideNavState } from '../recoil/atom';

const useSelectedItem = itemRef => {
  const middleScreen = useMediaQuery('(max-width: 51.25rem)');

  const isNavOpened = useRecoilValue(sideNavState);
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);

  useEffect(() => {
    if (middleScreen && isNavOpened) {
      setSelectedItem(null);
    }
  }, [middleScreen, isNavOpened]);

  useEffect(() => {
    if (!middleScreen && selectedItem && isNavOpened) {
      setSelectedItem(itemRef.current);
    }
  }, [middleScreen]);

  useEffect(() => {
    if (middleScreen && selectedItem && !isNavOpened) {
      setSelectedItem(itemRef.current);
    }
  }, [isNavOpened]);

  return middleScreen;
};

export default useSelectedItem;
