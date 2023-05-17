import { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { SCROLL_DELAY } from '../constants';

const useYScroll = () => {
  const [yPos, setYPos] = useState(0);
  useEffect(() => {
    const scrollHandler = throttle(() => {
      setYPos(window.pageYOffset);
    }, SCROLL_DELAY);
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  return yPos;
};

export default useYScroll;
