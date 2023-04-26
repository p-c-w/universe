import React, { useState } from 'react';
import { Grid, Button, rem } from '@mantine/core';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import Typing from './Typing';

import userState from '../../recoil/atom/userState';
import LogoBtn from './LogoBtn';

const SubmitBtnCotainer = styled.div`
  float: right;
  padding: 10px 0;
`;

const SubmitBtn = styled(Button)`
  margin: 10px;
  font-weight: 300;
`;

const SubmitLink = styled(Link)`
  text-decoration: none;
  color: white;
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
  const user = useRecoilValue(userState);

  const handleClick = async () => {
    try {
      const { email } = user.data;

      await axios.patch(`/api/users/${email}`, { subscribe_list: subscribedOtt });
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
          <Grid columns={3} style={{ margin: '30px' }} justify="center">
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
            <SubmitBtn variant="outline">
              <SubmitLink to="/signin">Skip</SubmitLink>
            </SubmitBtn>
            <SubmitBtn onClick={handleClick} variant="outline">
              <SubmitLink to="/signin">Submit</SubmitLink>
            </SubmitBtn>
          </SubmitBtnCotainer>
        </>
      )}
    </>
  );
};

export default SignupOption;
