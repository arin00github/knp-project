import React from "react";

import styled from "styled-components";

import { LoadingSpinner } from "./LoadingSpinner";

/**
 * styled-components 및 styled interface 정의 영역
 */
export const StyledLoadingWrap = styled.div`
    position: absolute;
    top: 59px;
    left: 16px;
    width: calc(100% - 32px);
    height: calc(100% - 75px);
`;

export const TableLoading = () => {
    return (
        <StyledLoadingWrap>
            <LoadingSpinner />
        </StyledLoadingWrap>
    );
};
