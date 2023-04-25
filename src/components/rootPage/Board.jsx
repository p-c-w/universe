import { useState, forwardRef } from 'react';
import { Group, Center, Flex, Box, SegmentedControl, MultiSelect, rem, CloseButton } from '@mantine/core';
import { IconDeviceTv, IconMovie } from '@tabler/icons-react';
import Cards from './Cards';

const countriesData = [
  { label: 'Netflix', value: 'netflix' },
  { label: 'Disney Plus', value: 'disneyplus' },
  { label: 'Prime Video', value: 'primevideo' },
  { label: 'Watcha', value: 'watcha' },
  { label: 'Wavve', value: 'wavve' },
  { label: 'Apple TV Plus', value: 'appletvplus' },
];

const badges = {
  appletvplus: '/assets/badges/appletvplus.svg',
  disneyplus: '/assets/badges/disneyplus.svg',
  netflix: '/assets/badges/netflix.svg',
  primevideo: '/assets/badges/primevideo.svg',
  watcha: '/assets/badges/watcha.svg',
  wavve: '/assets/badges/wavve.svg',
};

const Value = ({ value, label, onRemove, classNames, ...others }) => {
  const badgePath = badges[value];

  return (
    <div {...others}>
      <Box
        sx={theme => ({
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4]}`,
          paddingLeft: theme.spacing.xs,
          borderRadius: theme.radius.sm,
        })}
        h={30}>
        <Box mr={10}>
          {
            <Box w={20}>
              <img src={badgePath} alt="value" />
            </Box>
          }
        </Box>
        <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
        <CloseButton onMouseDown={onRemove} variant="transparent" size={22} iconSize={14} tabIndex={-1} />
      </Box>
    </div>
  );
};

const Item = forwardRef(({ label, value, ...others }, ref) => {
  const badgePath = badges[value];
  return (
    <div ref={ref} {...others}>
      <Flex align="center">
        <Box mr={10}>
          <Box w={20}>
            <img src={badgePath} alt="value" />
          </Box>
        </Box>
        <div>{label}</div>
      </Flex>
    </div>
  );
});

const Board = () => {
  const [media, setMedia] = useState('movie');

  return (
    <>
      <Flex mih={'md'} gap="md" justify="flex-start" align="center" direction="row" wrap="nowrap">
        <Group position="center">
          <SegmentedControl
            value={media}
            onChange={media => setMedia(media)}
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
          data={countriesData}
          miw={300}
          limit={6}
          valueComponent={Value}
          itemComponent={Item}
          searchable
          defaultValue={[]}
          placeholder="Pick Stream Service"
        />
      </Flex>
      <Cards />
    </>
  );
};

export default Board;
