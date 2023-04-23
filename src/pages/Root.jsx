import React from 'react';
import { Header, SideNavBar, Content, ThemeButton, Banner } from '../components';

const Root = () => {
  console.log('Root');
  return (
    <>
      <Header />
      <SideNavBar />
      <Content>
        <Banner />
      </Content>
      <ThemeButton />
    </>
  );
};

export default Root;
