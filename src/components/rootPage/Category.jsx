import { forwardRef, useRef } from 'react';
import { Group, Center, Flex, Box, SegmentedControl, MultiSelect, rem, CloseButton, Container } from '@mantine/core';
import { IconDeviceTv, IconMovie } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { PROVIDERS } from '../../constants';

const providerData = [
  { label: 'Netflix', value: 8 },
  { label: 'Watcha', value: 97 },
  { label: 'Amazon Prime Video', value: 119 },
  { label: 'Disney Plus', value: 337 },
  { label: 'Apple TV Plus', value: 350 },
  { label: 'Wavve', value: 356 },
];

const CategoryContainer = styled(Container)`
  border-bottom: 0.1px solid
    ${({ theme }) => (theme.colorScheme === 'dark' ? 'var(--mantine-color-gray-8)' : 'var(--mantine-color-gray-3)')};
  z-index: 999;
`;

const Value = ({ value, label, onRemove }) => {
  const badgePath = PROVIDERS[value].providerImgPath;

  return (
    <Box
      sx={theme => ({
        display: 'flex',
        cursor: 'default',
        alignItems: 'center',
        height: rem(30),
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4]}`,
        paddingLeft: theme.spacing.xs,
        borderRadius: theme.radius.sm,
      })}>
      <Box mr={10}>
        {
          <Box w={20}>
            <img src={`/${badgePath}`} alt="value" />
          </Box>
        }
      </Box>
      <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
      <CloseButton onMouseDown={onRemove} variant="transparent" size={22} iconSize={14} tabIndex={-1} />
    </Box>
  );
};

const Item = forwardRef(({ label, value, ...others }, ref) => {
  const badgePath = PROVIDERS[value].providerImgPath;

  return (
    <div ref={ref} {...others}>
      <Flex align="center">
        <Box mr={10}>
          <Box w={20}>
            <img src={`/${badgePath}`} alt="value" />
          </Box>
        </Box>
        <div>{label}</div>
      </Flex>
    </div>
  );
});

const Category = ({ media, handleMediaChange, handleCategoryChange }) => {
  const selectedCategory = useRef();

  const handleMultiSelectChange = values => {
    selectedCategory.current = values;
    handleCategoryChange(selectedCategory.current);
  };

  return (
    <CategoryContainer pos="sticky" top="3.75rem" mx="-2rem" px="2rem" py="xs" maw="none" opacity={0.9}>
      <Flex gap="md" justify="flex-start" align="center">
        <Group>
          <SegmentedControl
            value={media}
            onChange={handleMediaChange}
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
          onChange={handleMultiSelectChange}
        />
      </Flex>
    </CategoryContainer>
  );
};

export default Category;
