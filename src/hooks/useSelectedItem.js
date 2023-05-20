import { useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useRecoilValue } from 'recoil';
import { sideNavState } from '../recoil/atom';

const useSelectedItem = (selectedItem, setImgSrc, itemRef) => {
  const middleScreen = useMediaQuery('(max-width: 51.25rem)');

  const isNavOpened = useRecoilValue(sideNavState);

  useEffect(() => {
    if (middleScreen && isNavOpened) {
      setImgSrc(null);
    }
  }, [middleScreen, isNavOpened]);

  useEffect(() => {
    if (!middleScreen && selectedItem && isNavOpened) {
      setImgSrc(itemRef.current);
    }
  }, [middleScreen]);

  useEffect(() => {
    if (middleScreen && selectedItem && !isNavOpened) {
      setImgSrc(itemRef.current);
    }
  }, [isNavOpened]);

  return middleScreen;
};

export default useSelectedItem;
