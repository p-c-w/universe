import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import isSideNavOpenState from '../recoil/atom/isSideNavOpenState';

const Container = styled.div`
  width: calc(100vw - ${({ isOpened }) => (isOpened ? '12.5rem' : '4.875rem')});
  height: calc(100vh - 6.25rem);
  margin-top: 4.875rem;
  margin-left: ${({ isOpened }) => (isOpened ? '12.5rem' : '4.875rem')};
  margin-right: 4.875rem;
  padding: 1.875rem;
`;

const Content = ({ children }) => {
  const isOpened = useRecoilValue(isSideNavOpenState);

  return <Container isOpened={isOpened}>{children}</Container>;
};

export default Content;
