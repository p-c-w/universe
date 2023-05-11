import { Image, Flex, Container, Title, Space, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import emptybox from '../../assets/images/empty-box.svg';

const EmptyCollection = ({ category }) => (
  <Flex miw={800} h="100%" m={0} p={5} justify="center" align="center">
    <Container m={0}>
      <Title order={1} italic>
        텅~
      </Title>
      <Space h={10} />
      <Title order={2} fw={400}>
        {category.toUpperCase()} 컬렉션이 비어있어요
      </Title>
      <Space h={50} />
      <Button w={200} h={50} component={Link} to={'/'} fz="lg">
        컨텐츠 담으러 가기!
      </Button>
    </Container>
    <Image width={300} src={emptybox} />
  </Flex>
);

export default EmptyCollection;
