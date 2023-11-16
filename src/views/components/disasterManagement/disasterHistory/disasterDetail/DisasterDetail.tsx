import React from "react";

import { Stack } from "@innodep/tms-react-ui";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";

import { EditResponse, ResponseList } from ".";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled(Stack)`
    height: 100%;
`;
const StyledLeftWrap = styled.div`
    width: 60%;
    position: relative;
`;
const StyledRightWrap = styled.div`
    width: 40%;
    border-left: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;

interface MatchParams {
    id: string;
}

export const DisasterDetail = ({ match }: RouteComponentProps<MatchParams>) => {
    return (
        <StyledWrap gap={"0px"}>
            <StyledLeftWrap>
                <ResponseList disasterId={match.params.id} />
            </StyledLeftWrap>
            <StyledRightWrap>
                <EditResponse />
            </StyledRightWrap>
        </StyledWrap>
    );
};
