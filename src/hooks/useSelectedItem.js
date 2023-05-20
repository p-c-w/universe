import { useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedItemImgState, selectedItemState, sideNavState } from '../recoil/atom';

const useSelectedItem = itemRef => {
  const middleScreen = useMediaQuery('(max-width: 51.25rem)');

  const isNavOpened = useRecoilValue(sideNavState);
  const selectedItem = useRecoilValue(selectedItemState);
  const setSelectedItemImg = useSetRecoilState(selectedItemImgState);

  useEffect(() => {
    if (middleScreen && isNavOpened) {
      setSelectedItemImg(null);
    }
  }, [middleScreen, isNavOpened]);

  useEffect(() => {
    if (!middleScreen && selectedItem && isNavOpened) {
      setSelectedItemImg(itemRef.current);
    }
  }, [middleScreen]);

  useEffect(() => {
    if (middleScreen && selectedItem && !isNavOpened) {
      setSelectedItemImg(itemRef.current);
    }
  }, [isNavOpened]);

  return middleScreen;
};

export default useSelectedItem;
