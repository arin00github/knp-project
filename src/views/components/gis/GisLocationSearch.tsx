import React from "react";

import { Stack } from "@innodep/tms-react-ui";
import styled, { css } from "styled-components";

import { StyledMapControlDivButton } from "./GisControls";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledSearchButtonWrap = styled.div<{ inputCollapsed: boolean }>`
    position: absolute;
    width: 28px;
    height: 28px;
    top: 8px;
    left: 44px;
    transition: all 0.5s;
    ${(props) =>
        props.inputCollapsed &&
        css`
            width: 314px;
            input {
                display: block !important;
            }
            div > div {
                width: 26px;
                height: 26px;
                border: none;
            }
        `}
`;

const StyledInputIconWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const StyledSearchInput = styled.input`
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    caret-color: ${({ theme }) => theme.inputColor};
    color: ${({ theme }) => theme.inputColor};
    background-color: ${({ theme }) => theme.inputBgColor};
    outline: 0;
    border: 1px solid ${({ theme }) => theme.inputBorderColor};
    appearance: none;
    padding: 0 10px;
    font-size: 12px;
    &:hover,
    :focus {
        border: 1px solid #0b70b9;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-transition: background-color 9999s ease-out;
        -webkit-text-fill-color: ${({ theme }) => theme.inputColor} !important;
    }
    &::placeholder {
        color: #9e9e9e;
    }
`;

const StyledSearchButton = styled(StyledMapControlDivButton)`
    position: absolute;
    width: 28px;
    height: 28px;
    top: 50%;
    right: 0;
    transform: translate(-1px, -50%);
    transition: all 0.5s;
`;

const StyledSearchAddressResultsWrap = styled(Stack)`
    position: absolute;
    flex-direction: column;
    width: 100% !important;
    height: 260px !important;
    top: 30px;
    background: ${({ theme }) => theme.proSideBarBgColor};
    border: 1px solid ${({ theme }) => theme.proSideBarBorderColor} !important;
    overflow-y: auto;
    gap: 0;
    z-index: 3;
`;

const StyledAddressRow = styled(Stack)<{ active: boolean }>`
    width: 100% !important;
    height: auto !important;
    flex-direction: column;
    border-bottom: 1px solid ${({ theme }) => theme.proSideBarBorderColor} !important;
    padding: 16px 8px;
    cursor: pointer;
    > div {
        display: flex;
        align-items: center;
        width: 100% !important;
        font-size: 12px;
        height: auto !important;
        &:first-child {
            font-weight: 700;
            font-size: 14px;
        }
    }
    &:hover {
        box-shadow: inset 0 0 rgb(0 0 0 / 87%);
        background: #e0e0e0 !important;
        color: rgba(0, 0, 0, 0.8705882353) !important;
    }
    ${(props) =>
        props.active &&
        css`
            box-shadow: inset 0 0 rgb(0 0 0 / 87%);
            background: #e0e0e0 !important;
            color: rgba(0, 0, 0, 0.8705882353) !important;
        `}
`;
