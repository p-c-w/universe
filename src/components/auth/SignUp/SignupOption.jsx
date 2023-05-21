import { useState } from 'react';
import { Grid, Button, Container, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import { Typing, LogoBtn } from '.';
import { showNotification } from '../../../utils';

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

const SignupOption = ({ userInput, setUserInput }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [subscribedOtt, setSubscribedOtt] = useState([]);

  const submitOption = async () => {
    try {
      await axios.patch(`/api/users/${userInput}`, { subscribe_list: subscribedOtt });

      localStorage.removeItem('user');
      setUserInput(null);
    } catch (e) {
      showNotification(false, '구독서비스 선택');
    }
  };

  const activeLogoGrid = () => setAnimationCompleted(true);

  return (
    <>
      <Typing str="Congratulation!🥳🎉" isLast={0} />
      <Typing str="What OTT Services are you subscribing to?" isLast={1} onAnimationEnd={activeLogoGrid} />
      {animationCompleted && (
        <Container>
          <Grid columns={3} m={25} justify="center">
            {logos.map((logo, idx) => (
              <GridCol span={1} key={idx} display="flex">
                <LogoBtn logo={logo} idx={idx} subscribedOtt={subscribedOtt} setSubscribedOtt={setSubscribedOtt} />
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
