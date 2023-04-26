import React from 'react';
import styled from '@emotion/styled';

const Btn = styled.button`
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 4.375rem;
  height: 70px;
`;

const LogoBtn = ({ logo: { id, name }, idx }) => (
  <>
    <Btn type="button" disabled={idx > 5}>
      <LogoImg id={id} src={`./assets/badges/${name}.svg`} alt="button" />
    </Btn>
  </>
);

export default LogoBtn;
