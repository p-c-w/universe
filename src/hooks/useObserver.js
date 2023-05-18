import { useEffect, useRef, useCallback } from 'react';

const useObserver = (callback, options) => {
  const observerRef = useRef(null);

  const handleObserver = useCallback(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry, observer);
        }
      });
    },
    [callback]
  );

  useEffect(() => {
    const element = observerRef.current;

    const observer = new IntersectionObserver(handleObserver, options);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleObserver, options]);

  return observerRef;
};

export default useObserver;
