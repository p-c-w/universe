import { IconHeartFilled, IconDeviceTvOld, IconHistory } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import styled from '@emotion/styled';

const WatchIcon = styled(IconDeviceTvOld)`
  color: lightgray;
`;

const LikeIcon = styled(IconHeartFilled)`
  color: lightgray;
`;

const HistoryIcon = styled(IconHistory)`
  color: lightgray;
`;

const handleClick = e => {
  e.stopPropagation();
};

const CollectionButtons = ({ gap = 2, size, currentCategory }) => (
  <Flex gap={gap} align="center">
    {currentCategory !== 'watch' && <WatchIcon onClick={handleClick} size={size} />}
    {currentCategory !== 'like' && <LikeIcon onClick={handleClick} size={size} />}
    {currentCategory !== 'history' && <HistoryIcon onClick={handleClick} size={size} />}
  </Flex>
);

export default CollectionButtons;
