import styled from '@emotion/styled';
import { useMantineColorScheme, Button, Image, Container, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { SigninForm } from '../components/auth';

const Callout = styled(Container)`
  border: 1px solid ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[2])};
  border-radius: 0.375rem;
`;

const CreateAccount = styled(Link)`
  font-size: var(--mantine-font-size-sm);
  color: var(--mantine-color-blue-6);
`;

const SignIn = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Flex justify="center" align="center" direction="column" h="80vh" m="auto">
      <Button component={Link} to="/" w={90} h={90} variant="none">
        <Image src={`./assets/logos/universe${dark ? 'LogoWhite' : 'LogoBlack'}.svg`} alt="home button" />
      </Button>
      <Flex direction="column" w={350}>
        <SigninForm />
        <Callout align="center" w="100%" mt={15} fw={300}>
          <p>
            New to Universe? <CreateAccount to="/signup">Create an accout</CreateAccount>.
          </p>
        </Callout>
      </Flex>
    </Flex>
  );
};

export default SignIn;
