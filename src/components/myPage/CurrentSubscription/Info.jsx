import styled from '@emotion/styled';
import { Container } from '@mantine/core';
import { Fee, Unsubscriptions } from '.';
import { useUserQuery } from '../../../hooks/queries';

const StyledContainer = styled(Container)`
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2])};
  border-radius: 0.5rem;
`;

const getUserInfo = userInfo => ({
  subscribeList: userInfo.subscribe_list,
  watchList: userInfo.watch_list,
});

const defaultData = {
  subscribeList: [],
  watchList: [],
};

const SubscriptionInfo = () => {
  const { data = [] } = useUserQuery({
    select: getUserInfo,
    refetchOnWindowFocus: false,
  });
  const { subscribeList, watchList } = data || defaultData;

  return (
    <StyledContainer p={16}>
      <Fee subscribeList={subscribeList} />
      <Unsubscriptions subscribeList={subscribeList} watchList={watchList} />
    </StyledContainer>
  );
};

export default SubscriptionInfo;
