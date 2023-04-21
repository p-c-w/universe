import { Group, Text, Accordion, Button } from '@mantine/core';
import { Badge } from './index';

const mockData = [
  {
    id: '507129',
    image: 'assets/badges/appletvplus.svg',
    title: '모범택시',
    modified_at: '2021-05-18T12:59:32.746Z',
  },

  {
    id: '37692',
    image: 'assets/badges/disneyplus.svg',
    title: '기생충',
    modified_at: '2021-05-18T12:59:32.746Z',
  },

  {
    id: '54823',
    image: 'assets/badges/wavve.svg',
    title: 'Avengers',
    modified_at: '2021-05-18T12:59:32.746Z',
  },
];

const getAddedDate = modifiedAt => modifiedAt.match(/^([a-zA-Z0-9_.+-]+)T/)[1].replace(/-/g, ' .');

const AccordionLabel = ({ title, image }) => (
  <Group noWrap>
    <Badge src={image} />
    <div>
      <Text>{title}</Text>
      <Button variant="subtle" size="xs" compact>
        ♥︎
      </Button>
      <Button variant="subtle" size="xs" compact>
        🕰️
      </Button>
    </div>
  </Group>
);

const MyList = () => {
  const items = mockData.map(item => (
    <Accordion.Item value={item.id} key={item.id}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{getAddedDate(item.modified_at)}에 추가함</Text>
        <Text href="#" c="dimmed" fz="xs">
          상세페이지로
        </Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion chevronPosition="right" variant="separated">
      {items}
    </Accordion>
  );
};

export default MyList;
