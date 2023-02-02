/**
 * Global Font 스타일 관리 파일
 * @file src/styles/GlobalFonts.ts
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-07-26, 최초 작성
 */
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import NotoSansKRBlackOtf from "../assets/fonts/NotoSansKR-Black.otf";
import NotoSansKRBlackWoff from "../assets/fonts/NotoSansKR-Black.woff";
import NotoSansKRBlackWoff2 from "../assets/fonts/NotoSansKR-Black.woff2";
import NotoSansKRBoldOtf from "../assets/fonts/NotoSansKR-Bold.otf";
import NotoSansKRBoldWoff from "../assets/fonts/NotoSansKR-Bold.woff";
import NotoSansKRBoldWoff2 from "../assets/fonts/NotoSansKR-Bold.woff2";
import NotoSansKRDemiLightOtf from "../assets/fonts/NotoSansKR-DemiLight.otf";
import NotoSansKRDemiLightWoff from "../assets/fonts/NotoSansKR-DemiLight.woff";
import NotoSansKRDemiLightWoff2 from "../assets/fonts/NotoSansKR-DemiLight.woff2";
import NotoSansKRLightOtf from "../assets/fonts/NotoSansKR-Light.otf";
import NotoSansKRLightWoff from "../assets/fonts/NotoSansKR-Light.woff";
import NotoSansKRLightWoff2 from "../assets/fonts/NotoSansKR-Light.woff2";
import NotoSansKRMediumOtf from "../assets/fonts/NotoSansKR-Medium.otf";
import NotoSansKRMediumWoff from "../assets/fonts/NotoSansKR-Medium.woff";
import NotoSansKRMediumWoff2 from "../assets/fonts/NotoSansKR-Medium.woff2";
import NotoSansKRRegularOtf from "../assets/fonts/NotoSansKR-Regular.otf";
import NotoSansKRRegularWoff from "../assets/fonts/NotoSansKR-Regular.woff";
import NotoSansKRRegularWoff2 from "../assets/fonts/NotoSansKR-Regular.woff2";
import NotoSansKRThinOtf from "../assets/fonts/NotoSansKR-Thin.otf";
import NotoSansKRThinWoff from "../assets/fonts/NotoSansKR-Thin.woff";
import NotoSansKRThinWoff2 from "../assets/fonts/NotoSansKR-Thin.woff2";

export const GlobalFonts = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    font-weight: 100;
    src: url(${NotoSansKRThinOtf}) format('truetype')
    url(${NotoSansKRThinWoff}) format('woff'),
    url(${NotoSansKRThinWoff2}) format('woff2'),
  }

  @font-face {
    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    font-weight: 200;
    src: url(${NotoSansKRLightOtf}) format('truetype')
    url(${NotoSansKRLightWoff}) format('woff'),
    url(${NotoSansKRLightWoff2}) format('woff2'),
  }

  @font-face {
    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    font-weight: 300;
    src: url(${NotoSansKRDemiLightOtf}) format('truetype')
    url(${NotoSansKRDemiLightWoff}) format('woff'),
    url(${NotoSansKRDemiLightWoff2}) format('woff2'),
  }

  @font-face {
    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    font-weight: 400;
    src: url(${NotoSansKRRegularOtf}) format('truetype')
    url(${NotoSansKRRegularWoff}) format('woff'),
    url(${NotoSansKRRegularWoff2}) format('woff2'),
  }

  @font-face {
    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    font-weight: 500;
    src: url(${NotoSansKRMediumOtf}) format('truetype')
    url(${NotoSansKRMediumWoff}) format('woff'),
    url(${NotoSansKRMediumWoff2}) format('woff2'),
  }

  @font-face {
    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    font-weight: 700;
    src: url(${NotoSansKRBoldOtf}) format('truetype')
    url(${NotoSansKRBoldWoff}) format('woff'),
    url(${NotoSansKRBoldWoff2}) format('woff2'),
  }

  @font-face {
    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    font-weight: 900;
    src: url(${NotoSansKRBlackOtf}) format('truetype')
    url(${NotoSansKRBlackWoff}) format('woff'),
    url(${NotoSansKRBlackWoff2}) format('woff2'),
  }
`;
