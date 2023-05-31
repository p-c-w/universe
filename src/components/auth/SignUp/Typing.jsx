import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const typingCursor = keyframes`
 from {
    border-right-color: rgba(17, 17, 17, 0.9);
  }
  to {
    border-right-color: rgba(255, 255, 255, 0.8);
  }
`;

const FirstTypeOut = styled.div`
  font-family: consolas;
  overflow: hidden;
  border-right: 2px solid none;
  white-space: nowrap;
  font-size: ${({ fontSize }) => (fontSize === 'small' ? '1rem;' : '1.2rem;')};
  width: 0;
  animation: ${typing} 1.5s steps(20, end) forwards,
    ${typingCursor} 900ms steps(20) ${({ last }) => last && 'infinite;'};
  animation-delay: ${({ last }) => last && `calc(${last} * 1.5s);`};
`;

const Typing = ({ str, isLast, fontSize, setAnimationCompleted }) => (
  <FirstTypeOut last={isLast} fontSize={fontSize} onAnimationEnd={setAnimationCompleted}>
    {str}
  </FirstTypeOut>
);

export default Typing;
