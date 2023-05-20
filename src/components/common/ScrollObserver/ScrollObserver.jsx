const ScrollObserver = ({ loader, observer = null }) => <div ref={observer}>{loader}</div>;

export default ScrollObserver;
