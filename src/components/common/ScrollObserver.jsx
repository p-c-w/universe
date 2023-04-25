import { BarLoader } from '.';

const ScrollObserver = ({ hasNextPage = true, observer = null }) => (
  <div ref={observer}>{hasNextPage && <BarLoader />}</div>
);

export default ScrollObserver;
