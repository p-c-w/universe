import React from 'react';
import { GlobalShell, ThemeButton } from '../components/common';
import { Cards, Board } from '../components/rootPage';

const Root = () => {
  console.log('Root');

  return (
    <>
      <GlobalShell>
        {/* <Banner /> */}
        <Board />
        <Cards />
      </GlobalShell>
      <ThemeButton />
    </>
  );
};

export default Root;
