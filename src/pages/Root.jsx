import React from 'react';
import { GlobalShell, ThemeButton } from '../components';

const Root = () => {
  console.log('Root');
  return (
    <>
      <GlobalShell>{/* children */}</GlobalShell>
      <ThemeButton />
    </>
  );
};

export default Root;
