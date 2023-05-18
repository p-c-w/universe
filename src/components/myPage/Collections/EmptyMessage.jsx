import { Image, Flex, Container, Title, Space, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import emptybox from '../../../assets/images/empty-box.svg';

const EmptyMessage = ({ category }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  return (
    <Flex h="100%" m={0} mt={10} p={5} justify="center" align="center">
      <Container m={0}>
        <Title order={2} size={smallScreen ? 27 : 30} italic>
          텅~
        </Title>
        <Space h={10} />
        <Title order={3} size={smallScreen ? 20 : 22} fw={400}>
          {category.toUpperCase()} 컬렉션이 비어있어요
        </Title>
        <Space h={smallScreen ? 20 : 50} />
        <Button size={smallScreen ? 'lg' : 'xl'} component={Link} to={'/'}>
          컨텐츠 담으러 가기!
        </Button>
      </Container>
      <Image width={smallScreen ? 200 : 300} src={emptybox} />
    </Flex>
  );
};

export default EmptyMessage;
