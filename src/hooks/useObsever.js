import { useRef, useEffect, useCallback } from 'react';

const useObsever = (callback, option = { threshold: 0.8 }) => {
  const observerRef = useRef(null);

  const handleObserver = useCallback(
    entries => {
      const [target] = entries;
      if (target.isIntersecting) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    const element = observerRef.current;

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [handleObserver, option]);

  return observerRef;
};

export default useObsever;
