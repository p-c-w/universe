import { Image, Flex, Container, Title, Space, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import emptybox from '../../assets/images/empty-box.svg';

const EmptyCollection = ({ category }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');
  const xsmallScreen = useMediaQuery('(max-width: 30rem)');

  return (
    <Flex h="100%" m={0} mt={10} p={5} justify="center" align="center">
      <Container m={0}>
        <Title order={2} size={xsmallScreen ? 25 : smallScreen ? 27 : 30} italic>
          텅~
        </Title>
        <Space h={10} />
        <Title order={3} size={xsmallScreen ? 18 : smallScreen ? 20 : 22} fw={400}>
          {category.toUpperCase()} 컬렉션이 비어있어요
        </Title>
        <Space h={smallScreen ? 20 : 50} />
        <Button size={xsmallScreen ? 'md' : smallScreen ? 'lg' : 'xl'} component={Link} to={'/'}>
          컨텐츠 담으러 가기!
        </Button>
      </Container>
      <Image width={xsmallScreen ? 150 : smallScreen ? 200 : 300} src={emptybox} />
    </Flex>
  );
};

export default EmptyCollection;
