import React from 'react';
import { Header, SideNavBar, Content, ThemeButton } from '../components';

const Root = () => {
  console.log('Root');
  return (
    <>
      <Header />
      <SideNavBar />
      <Content>{/* 내부 컨텐츠 컴포넌트 넣어주세요 */}</Content>
      <ThemeButton />
    </>
  );
};

export default Root;
