import { Pagination, Group } from '@mantine/core';

const PaginationGoup = ({ total, activePage, setActivePage }) => (
  <>
    <Pagination.Root
      total={total}
      value={activePage}
      onChange={setActivePage}
      siblings={2}
      withEdges
      align="center"
      position="center"
      size="sm"
      m="sm">
      <Group spacing={5} position="center">
        <Pagination.First aria-label="first page button" />
        <Pagination.Previous aria-label="previous page button" />
        <Pagination.Items />
        <Pagination.Next aria-label="next page button" />
        <Pagination.Last aria-label="last page button" />
      </Group>
    </Pagination.Root>
  </>
);

export default PaginationGoup;
