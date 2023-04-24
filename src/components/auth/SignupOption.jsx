import React from 'react';
import { Grid, Button } from '@mantine/core';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import Typing from './Typing';

import userState from '../../recoil/atom/userState';

const LogoImg = styled.img`
  width: 4.375rem;
  height: 70px;
`;

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

const logos = ['appletvplus', 'disneyplus', 'netflix', 'primevideo', 'watcha', 'wavve'];

const SignupOption = () => {
  const subscribed = [];
  const user = useRecoilValue(userState);

  const handleClick = async () => {
    try {
      const { email } = user.data;
      await axios.patch(`/api/users/${email}`, { subscribe_list: subscribed });
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  return (
    <>
      <Typing str="Congratulation!🥳🎉" isLast={0} />
      <Typing str="What OTT Services are you subscribing to?" isLast={1} />
      <Typing str="(Optional)" isLast={2} fontSize={'small'} />
      <Grid columns={3} style={{ margin: '30px' }}>
        {logos.map(logo => (
          <Grid.Col span={1} key={logo} style={{ textAlign: 'center' }}>
            <LogoImg src={`./assets/badges/${logo}.svg`} alt="button" />
          </Grid.Col>
        ))}
      </Grid>
      <SubmitBtnCotainer>
        <SubmitBtn variant="filled">
          <SubmitLink to="/signin">Skip</SubmitLink>
        </SubmitBtn>
        <SubmitBtn onClick={() => handleClick()} variant="filled">
          <SubmitLink to="/signin">Submit</SubmitLink>
        </SubmitBtn>
      </SubmitBtnCotainer>
    </>
  );
};

export default SignupOption;
