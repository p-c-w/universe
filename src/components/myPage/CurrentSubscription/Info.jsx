import styled from '@emotion/styled';
import { Container } from '@mantine/core';
import { useUserQuery } from '../../../hooks/queries';
import { Fee, Unsubscriptions } from '.';

const StyledContainer = styled(Container)`
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2])};
  border-radius: 0.5rem;
  margin: 0;
  padding: 1rem;
  width: 100%;
`;

const getUserInfo = userInfo => ({
  subscribeList: userInfo.subscribe_list,
  watchList: userInfo.watch_list,
});

const Info = () => {
  const { data } = useUserQuery({
    select: getUserInfo,
    refetchOnWindowFocus: false,
  });

  const { subscribeList, watchList } = data;

  return (
    <StyledContainer>
      <Fee subscribeList={subscribeList} />
      <Unsubscriptions subscribeList={subscribeList} watchList={watchList} />
    </StyledContainer>
  );
};

export default Info;
