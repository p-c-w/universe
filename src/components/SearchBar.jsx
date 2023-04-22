import styled from '@emotion/styled';
import { Input, Tooltip } from '@mantine/core';
import { IconSearch, IconAlertCircle } from '@tabler/icons-react';

const Container = styled.div`
  width: 100%;
  margin: 0 1.875rem;
`;

const Bar = styled(Input)`
  position: absolute;
  width: 37.5rem;
  top: 1.25rem;
  left: 50%;
  transform: translate(-50%, 0);
  border: 5px;
`;

const SearchBar = () => (
  <Container>
    <Bar
      icon={<IconSearch size="1rem" />}
      placeholder="Search"
      rightSection={
        <Tooltip label="This is public" position="top-end" withArrow>
          <div>
            <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
          </div>
        </Tooltip>
      }
    />
  </Container>
);

export default SearchBar;
