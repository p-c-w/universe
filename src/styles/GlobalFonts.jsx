import { Global } from '@mantine/core';
import styled from '@emotion/styled';

import boldEot from '../assets/fonts/SpoqaHanSansNeo-Bold.eot';
import boldWoff2 from '../assets/fonts/SpoqaHanSansNeo-Bold.woff2';
import boldWoff from '../assets/fonts/SpoqaHanSansNeo-Bold.woff';
import boldOft from '../assets/fonts/SpoqaHanSansNeo-Bold.otf';

import mediumEot from '../assets/fonts/SpoqaHanSansNeo-Medium.eot';
import mediumWoff2 from '../assets/fonts/SpoqaHanSansNeo-Medium.woff2';
import mediumWoff from '../assets/fonts/SpoqaHanSansNeo-Medium.woff';
import mediumOtf from '../assets/fonts/SpoqaHanSansNeo-Medium.otf';

import regularEot from '../assets/fonts/SpoqaHanSansNeo-Regular.eot';
import regularWoff2 from '../assets/fonts/SpoqaHanSansNeo-Regular.woff2';
import regularWoff from '../assets/fonts/SpoqaHanSansNeo-Regular.woff';
import regularOtf from '../assets/fonts/SpoqaHanSansNeo-Regular.otf';

import lightEot from '../assets/fonts/SpoqaHanSansNeo-Light.eot';
import lightWoff2 from '../assets/fonts/SpoqaHanSansNeo-Light.woff2';
import lightWoff from '../assets/fonts/SpoqaHanSansNeo-Light.woff';
import lightOtf from '../assets/fonts/SpoqaHanSansNeo-Light.otf';

import thinEot from '../assets/fonts/SpoqaHanSansNeo-Thin.eot';
import thinWoff2 from '../assets/fonts/SpoqaHanSansNeo-Thin.woff2';
import thinWoff from '../assets/fonts/SpoqaHanSansNeo-Thin.woff';
import thinOtf from '../assets/fonts/SpoqaHanSansNeo-Thin.otf';

const GlobalFonts = styled(Global)`
  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 700;
    src: local('Spoqa Han Sans Neo Bold'), url(${boldEot}) format('embedded-opentype'),
      url(${boldWoff2}) format('woff2'), url(${boldWoff}) format('woff'), url(${boldOft}) format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    src: local('Spoqa Han Sans Neo Regular'), url(${mediumEot}) format('embedded-opentype'),
      url(${mediumWoff2}) format('woff2'), url(${mediumWoff}) format('woff'), url(${mediumOtf}) format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 400;
    src: local('Spoqa Han Sans Neo Light'), url(${lightEot}) format('embedded-opentype'),
      url(${regularWoff2}) format('woff2'), url(${regularWoff}) format('woff'), url(${regularOtf}) format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 300;
    src: local('Spoqa Han Sans Neo Light'), url(${regularEot}) format('embedded-opentype'),
      url(${lightWoff2}) format('woff2'), url(${lightWoff}) format('woff'), url(${lightOtf}) format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 100;
    src: local('Spoqa Han Sans Neo Thin'), url(${thinEot}) format('embedded-opentype'),
      url(${thinWoff2}) format('woff2'), url(${thinWoff}) format('woff'), url(${thinOtf}) format('truetype');
    font-display: swap;
  }
`;

export default GlobalFonts;
