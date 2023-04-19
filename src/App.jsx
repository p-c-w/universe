import React from 'react';
import { MantineProvider } from '@mantine/core';
import styled from '@emotion/styled';

const Test = styled.div`
  font-size: 3rem;
`;

const App = () => {
  console.log("Hi i'm App");

  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Test>hi!</Test>
      </MantineProvider>
    </>
  );
};

export default App;
