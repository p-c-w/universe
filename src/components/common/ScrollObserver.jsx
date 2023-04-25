import { Loader } from '@mantine/core';

const ScrollObserver = ({ hasNextPage = true, observer = null }) => (
  <div ref={observer}>{hasNextPage && <Loader color="grape" size="lg" variant="bars" />}</div>
);

export default ScrollObserver;
