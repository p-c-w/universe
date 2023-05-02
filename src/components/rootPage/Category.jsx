import { forwardRef, useRef } from 'react';
import {
  Group,
  Center,
  Flex,
  Box,
  SegmentedControl,
  MultiSelect,
  rem,
  CloseButton,
  useMantineColorScheme,
} from '@mantine/core';
import { IconDeviceTv, IconMovie } from '@tabler/icons-react';

const providerData = [
  { label: 'Netflix', value: 8 },
  { label: 'Watcha', value: 97 },
  { label: 'Amazon Prime Video', value: 119 },
  { label: 'Disney Plus', value: 337 },
  { label: 'Apple TV Plus', value: 350 },
  { label: 'Wavve', value: 356 },
];

const badges = {
  8: '/netflix.svg',
  97: '/watcha.svg',
  337: '/disneyplus.svg',
  350: '/appletvplus.svg',
  119: '/primevideo.svg',
  356: '/wavve.svg',
};

const Value = ({ value, label, onRemove }) => {
  const badgePath = badges[value];

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
            <img src={`/assets/badges${badgePath}`} alt="value" />
          </Box>
        }
      </Box>
      <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
      <CloseButton onMouseDown={onRemove} variant="transparent" size={22} iconSize={14} tabIndex={-1} />
    </Box>
  );
};

const Item = forwardRef(({ label, value, ...others }, ref) => {
  const badgePath = badges[value];

  return (
    <div ref={ref} {...others}>
      <Flex align="center">
        <Box mr={10}>
          <Box w={20}>
            <img src={`/assets/badges${badgePath}`} alt="value" />
          </Box>
        </Box>
        <div>{label}</div>
      </Flex>
    </div>
  );
});

const Category = ({ media, handleMediaChange, handleCategoryChange }) => {
  const selectedCategory = useRef();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const handleMultiSelectChange = values => {
    selectedCategory.current = values;
    handleCategoryChange(selectedCategory.current);
  };

  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: dark ? 'var(--mantine-color-dark-7)' : 'var(--mantine-color-white)',
        position: 'sticky',
        margin: '0 calc(-2 * (var(--mantine-spacing-md))',
        padding: '0 var(--mantine-spacing-xl)',
        top: '3.75rem',
        height: '3.125rem',
        opacity: 0.9,
        backdropFilter: 'blur(30px)',
        zIndex: 999,
      }}>
      <Flex mih={'md'} gap="md" justify="flex-start" align="center">
        <Group position="center">
          <SegmentedControl
            value={media}
            onChange={handleMediaChange}
            data={[
              {
                value: 'movie',
                label: (
                  <Center>
                    <IconMovie size="1rem" stroke={1.5} />
                    <Box ml={10}>Movie</Box>
                  </Center>
                ),
              },
              {
                value: 'tv',
                label: (
                  <Center>
                    <IconDeviceTv size="1rem" stroke={1.5} />
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
    </div>
  );
};

export default Category;
