import React, { useState } from 'react';
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
  const subscribed = [];
  const user = useRecoilValue(userState);

  const handleClick = async () => {
    try {
      const { email } = user;
      await axios.patch(`/api/users/${email}`, { subscribe_list: subscribed });
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  const handleLogoClick = e => {
    subscribed.push({ id: +e.target.id, price: 'basic' });
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
          <Grid columns={3} style={{ margin: '30px' }}>
            {logos.map(({ name, id }, idx) => (
              <Grid.Col span={1} key={name} style={{ textAlign: 'center' }}>
                <button
                  onClick={e => {
                    handleLogoClick(e);
                    console.log('array: ', subscribed);
                  }}
                  type="button"
                  disabled={idx > 5}
                  style={{ border: 'none', padding: 0, background: 'none' }}>
                  <LogoImg id={id} src={`./assets/badges/${name}.svg`} alt="button" />
                </button>
              </Grid.Col>
            ))}
          </Grid>
          <SubmitBtnCotainer>
            <SubmitBtn variant="filled">
              <SubmitLink to="/signin">Skip</SubmitLink>
            </SubmitBtn>
            <SubmitBtn onClick={handleClick} variant="filled">
              <SubmitLink to="/signin">Submit</SubmitLink>
            </SubmitBtn>
          </SubmitBtnCotainer>
        </>
      )}
    </>
  );
};

export default SignupOption;
