import { useRef } from 'react';
import {
  Group,
  Center,
  Flex,
  Box,
  SegmentedControl,
  MultiSelect,
  useMantineColorScheme,
  Container,
} from '@mantine/core';
import { IconDeviceTv, IconMovie } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { Value, Item } from '.';

const providerData = [
  { label: 'Netflix', value: 8 },
  { label: 'Watcha', value: 97 },
  { label: 'Amazon Prime Video', value: 119 },
  { label: 'Disney Plus', value: 337 },
  { label: 'Apple TV Plus', value: 350 },
  { label: 'Wavve', value: 356 },
];

const CategoryContainer = styled(Container)`
  z-index: 999;
`;

const Category = ({ mediaType, changeMediaType, changeCategory }) => {
  const selectedCategory = useRef();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const changeMultiSelect = values => {
    selectedCategory.current = values;
    changeCategory(selectedCategory.current);
  };

  return (
    <CategoryContainer
      pos="sticky"
      bg={dark ? 'dark.7' : 'white'}
      top={60}
      mx={-32}
      py="xs"
      px="xl"
      maw="none"
      opacity={0.9}>
      <Flex gap="md" justify="flex-start" align="center">
        <Group>
          <SegmentedControl
            value={mediaType}
            onChange={changeMediaType}
            data={[
              {
                value: 'movie',
                label: (
                  <Center>
                    <IconMovie size={16} stroke={1.5} />
                    <Box ml={10}>Movie</Box>
                  </Center>
                ),
              },
              {
                value: 'tv',
                label: (
                  <Center>
                    <IconDeviceTv size={16} stroke={1.5} />
                    <Box ml={10}>TV</Box>
                  </Center>
                ),
              },
            ]}
          />
        </Group>
        <MultiSelect
          data={providerData}
          miw={300}
          limit={6}
          valueComponent={Value}
          itemComponent={Item}
          searchable
          defaultValue={[]}
          placeholder="Pick Stream Service"
          onChange={changeMultiSelect}
        />
      </Flex>
    </CategoryContainer>
  );
};

export default Category;
