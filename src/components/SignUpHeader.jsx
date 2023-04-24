import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Top = styled.div`
  padding: 40px 80px;
  height: 100px;
  justify-content: center;
  align-content: center;
`;

const Logo = styled.button`
  width: 3.75rem;
  height: 3.75rem;
  border: none;
  background-color: transparent;
  float: left;
`;

const Callout = styled.div`
  float: right;
`;

const SignUpHeader = () => (
  <>
    <Top className="conatiner top">
      <Logo>
        <img src={`./assets/logos/universeLogoWhite.svg`} alt="home button" />
      </Logo>
      <Callout>
        <span>Already have an account?</span>
        <Link to="/signin">Sign in→</Link>
      </Callout>
    </Top>
  </>
);

export default SignUpHeader;
