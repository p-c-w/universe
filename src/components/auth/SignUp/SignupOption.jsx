import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Container, Flex } from '@mantine/core';
import styled from '@emotion/styled';
import { Typing, Logo } from '.';
import { showNotification } from '../../../utils';
import { updateSubscribeList } from '../../../api';

const GridCol = styled(Grid.Col)`
  text-align: center;
  align-items: center;
  justify-content: center;
  min-height: 7.5rem;
`;

const logos = [
  { name: 'appletvplus', id: 350 },
  { name: 'disneyplus', id: 337 },
  { name: 'netflix', id: 8 },
  { name: 'primevideo', id: 119 },
  { name: 'watcha', id: 97 },
  { name: 'wavve', id: 356 },
  { name: 'universeLogoBlack' },
  { name: 'universeLogoBlack' },
  { name: 'universeLogoBlack' },
];

const SignupOption = ({ email, setUserInput }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [subscribedOtt, setSubscribedOtt] = useState([]);

  const submitOption = async () => {
    try {
      updateSubscribeList({ email, newList: subscribedOtt });

      localStorage.removeItem('user');
      setUserInput(null);
    } catch (e) {
      showNotification(false, '구독서비스 선택');
    }
  };

  return (
    <>
      <Typing str="Congratulation!🥳🎉" isLast={0} />
      <Typing
        str="What OTT Services are you subscribing to?"
        isLast={1}
        setAnimationCompleted={() => {
          setAnimationCompleted(true);
        }}
      />
      {animationCompleted && (
        <Container>
          <Grid columns={3} m={25} justify="center">
            {logos.map((logo, idx) => (
              <GridCol span={1} key={idx} display="flex">
                <Logo logo={logo} idx={idx} subscribedOtt={subscribedOtt} setSubscribedOtt={setSubscribedOtt} />
              </GridCol>
            ))}
          </Grid>
          <Flex justify="flex-end" gap={5}>
            <Button component={Link} w={90} to="/signin" c="white" fw={300} variant="outline" onClick={submitOption}>
              Skip
            </Button>
            <Button component={Link} w={90} to="/signin" c="white" fw={300} variant="outline" onClick={submitOption}>
              Submit
            </Button>
          </Flex>
        </Container>
      )}
    </>
  );
};

export default SignupOption;
