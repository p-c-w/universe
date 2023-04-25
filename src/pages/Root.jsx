import React from 'react';
import { GlobalShell, ThemeButton } from '../components/common';
import { Banner, Board } from '../components/rootPage';

const Root = () => {
  console.log('Root');

  return (
    <>
      <GlobalShell>
        <Banner />
        <Board />
      </GlobalShell>
      <ThemeButton />
    </>
  );
};

export default Root;
