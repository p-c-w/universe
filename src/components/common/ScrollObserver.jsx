const ScrollObserver = ({ loader, hasNextPage = true, observer = null }) => (
  <div ref={observer}>{hasNextPage && loader}</div>
);

export default ScrollObserver;
