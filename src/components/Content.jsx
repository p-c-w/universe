import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import isSideNavOpenState from '../recoil/atom/isSideNavOpenState';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin-top: ${({ isOpend }) => (isOpend ? '12.5rem' : '4.875rem')};
  margin-left: 6.25rem;
`;

const Content = ({ children }) => {
  const isOpend = useRecoilValue(isSideNavOpenState);

  return <Container isOpened={isOpend}>{children}</Container>;
};

export default Content;
