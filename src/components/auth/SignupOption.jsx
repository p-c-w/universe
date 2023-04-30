import React, { useState } from 'react';
import { Grid, Button, rem, Container } from '@mantine/core';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import Typing from './Typing';

import userState from '../../recoil/atom/userState';
import LogoBtn from './LogoBtn';

const SubmitBtnCotainer = styled.div`
  float: right;
  padding: 10px 0;
`;

const logos = [
  { name: 'appletvplus', id: 350 },
  { name: 'disneyplus', id: 337 },
  { name: 'netflix', id: 8 },
  { name: 'primevideo', id: 119 },
  { name: 'watcha', id: 97 },
  { name: 'wavve', id: 356 },
  { name: 'universeLogoWhite1' },
  { name: 'universeLogoWhite2' },
  { name: 'universeLogoWhite3' },
];

const SignupOption = () => {
  const [isLogo, setIsLogo] = useState(false);
  const [subscribedOtt, setSubscribedOtt] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  const handleClick = async () => {
    try {
      const { email } = user.data;

      await axios.patch(`/api/users/${email}`, { subscribe_list: subscribedOtt });
      setUser(null);
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  return (
    <>
      <Typing str="Congratulation!🥳🎉" isLast={0} />
      <Typing str="What OTT Services are you subscribing to?" isLast={1} />
      <Typing
        str="(Optional)"
        isLast={2}
        fontSize={'small'}
        onAnimationEnd={() => {
          setIsLogo(true);
        }}
      />
      {isLogo && (
        <>
          <Grid columns={3} m={30} justify="center">
            {logos.map((logo, idx) => (
              <Grid.Col
                span={1}
                key={logo.name}
                style={{
                  textAlign: 'center',
                  minHeight: rem(120),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <LogoBtn logo={logo} idx={idx} subscribedOtt={subscribedOtt} setSubscribedOtt={setSubscribedOtt} />
              </Grid.Col>
            ))}
          </Grid>
          <SubmitBtnCotainer>
            <Button component={Link} to="/signin" c="#FFF" fw={300} variant="outline" onClick={handleClick}>
              Skip
            </Button>
            <Button component={Link} ml={5} to="/signin" c="#FFF" fw={300} variant="outline" onClick={handleClick}>
              Submit
            </Button>
          </SubmitBtnCotainer>
        </>
      )}
    </>
  );
};

export default SignupOption;
