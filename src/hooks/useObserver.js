import { useRef, useEffect, useCallback } from 'react';

const useObserver = (callback, hasNextPage, option) => {
  const observerRef = useRef(null);

  const handleObserver = useCallback(
    entries => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        callback();
      }
    },
    [callback, hasNextPage]
  );

  useEffect(() => {
    const element = observerRef.current;

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [handleObserver, option]);

  return observerRef;
};

export default useObserver;
