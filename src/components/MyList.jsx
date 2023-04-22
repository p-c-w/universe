import { Group, Text, Accordion, Button } from '@mantine/core';
import { useRef } from 'react';
import { Badge } from './index';

// mockdata
const users = [
  {
    email: 'snowlover@gmail.com',
    password: 'snow123',
    name: 'snowlover',
    subscribe_list: [{ id: 8, price: 7900 }],
    like_list: [
      { id: 507129, type: 'movie', modified_at: '2021-12-25T12:59:32.746Z' },
      { id: 37692, type: 'tv', modified_at: '2020-12-31T12:59:32.746Z' },
    ],
    watch_list: [{ id: 18465, type: 'movie', modified_at: '2021-05-18T12:59:32.746Z' }],
    history_list: [
      { id: 829, type: 'movie', modified_at: '2023-04-15T12:59:32.746Z' },
      { id: 54823, type: 'tv', modified_at: '2022-01-01T12:59:32.746Z' },
    ],
  },
  {
    email: 'squid@gmail.com',
    password: 'squid456',
    name: 'squid',
    subscribe_list: [{ id: 8, price: 7900 }],
    like_list: [
      { id: 507129, type: 'movie', modified_at: '2021-12-25T12:59:32.746Z' },
      { id: 37692, type: 'tv', modified_at: '2020-12-31T12:59:32.746Z' },
    ],
    watch_list: [{ id: 18465, type: 'movie', modified_at: '2021-05-18T12:59:32.746Z' }],
    history_list: [
      { id: 829, type: 'movie', modified_at: '2023-04-15T12:59:32.746Z' },
      { id: 54823, type: 'tv', modified_at: '2022-01-01T12:59:32.746Z' },
    ],
  },
  {
    email: 'noname@gmail.com',
    password: 'noname123',
    name: 'noname',
    subscribe_list: [{ id: 8, price: 7900 }],
    like_list: [
      { id: 507129, type: 'movie', modified_at: '2021-12-25T12:59:32.746Z' },
      { id: 37692, type: 'tv', modified_at: '2020-12-31T12:59:32.746Z' },
    ],
    watch_list: [{ id: 18465, type: 'movie', modified_at: '2021-05-18T12:59:32.746Z' }],
    history_list: [
      { id: 829, type: 'movie', modified_at: '2023-04-15T12:59:32.746Z' },
      { id: 54823, type: 'tv', modified_at: '2022-01-01T12:59:32.746Z' },
    ],
  },
];

const mockData = [
  {
    id: '507129',
    providerImg: 'assets/badges/appletvplus.svg',
    title: '모범택시',
    contentImg: 'https://image.tmdb.org/t/p/w300/xHB43aUOtIezsD0lUzA0Sqk7ALr.jpg',
    modified_at: '2021-05-18T12:59:32.746Z',
  },

  {
    id: '37692',
    providerImg: 'assets/badges/disneyplus.svg',
    title: '기생충',
    contentImg: 'https://image.tmdb.org/t/p/w300/jjHccoFjbqlfr4VGLVLT7yek0Xn.jpg',
    modified_at: '2021-05-18T12:59:32.746Z',
  },

  {
    id: '54823',
    providerImg: 'assets/badges/wavve.svg',
    title: 'Avengers',
    contentImg: 'https://image.tmdb.org/t/p/w300/1uHRkB2Q00Y4i7I7KNd0jGi4OmY.jpg',
    modified_at: '2021-05-18T12:59:32.746Z',
  },
];

const getAddedDate = modifiedAt => modifiedAt.match(/^([a-zA-Z0-9_.+-]+)T/)[1].replace(/-/g, ' .');

const AccordionLabel = ({ title, providerImg }) => (
  <Group noWrap>
    <Badge src={providerImg} />
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

const MyList = ({ setSelected, setImgSrc }) => {
  const itemRef = useRef(null);

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

  const handleChange = e => {
    itemRef.current = e;
    setSelected(itemRef.current !== null);
    setImgSrc(mockData.find(item => item.id === e)?.contentImg);
  };

  return (
    <Accordion chevronPosition="right" variant="separated" sx={{ width: '100%' }} onChange={handleChange}>
      {items}
    </Accordion>
  );
};

export default MyList;
