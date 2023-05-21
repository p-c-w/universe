import { Button, Container, Flex, Image, Space, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

const Slide = ({ url, title, subtitle }) => (
  <Flex h="100%" m={0} p={50} justify="center" align="center">
    <Container m={0}>
      <Title order={1} c="black">
        {title}
      </Title>
      <Space h={10} />
      <Title order={2} fw={400} c="black">
        {subtitle}
      </Title>
      <Space h={50} />
      <Button w={280} h={50} component={Link} to={'/signin'} fz="lg">
        Get Started!
      </Button>
    </Container>
    <Space w={100} />
    <Image maw={500} h="100%" src={url} fit="contain" alt="welcome banner" />
  </Flex>
);

export default Slide;
