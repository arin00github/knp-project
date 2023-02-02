/**
 * Global 스타일 관리 파일
 * @file src/styles/GlobalStyles.ts
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-07-26, 최초 작성
 */
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}
  *::-webkit-scrollbar {
    width: 5px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 5px;
  }

  *, *::before, *::after {
    font-size: 14px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    outline: 0 none;
    padding: 0;
  }

  body {
    padding:0;
    margin:0;
    font-family: "Noto Sans CJK KR";
  }

  a {
    text-decoration: none;
  }

  .pro-sidebar:not(.collapsed) .popper-inner {
      display: none;
  }
`;
