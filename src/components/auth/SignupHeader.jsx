import { Link } from 'react-router-dom';
import { Flex, Button, Image, Container } from '@mantine/core';

const SignupHeader = () => (
  <Flex justify="space-between" align="center" mx={30} w="full">
    <Button component={Link} to="/" w={80} h={80} variant="none">
      <Image src={`./assets/logos/universeLogoWhite.svg`} alt="home button" />
    </Button>
    <Container m={0} p={0}>
      Already have an account?
      <Link to="/signin"> Sign in→</Link>
    </Container>
  </Flex>
);

export default SignupHeader;
