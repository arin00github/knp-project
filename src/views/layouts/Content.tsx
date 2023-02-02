import React, { ReactNode } from "react";

import styled from "styled-components";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledContent = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 150px);
    display: flex;
    flex-grow: 1;
    color: ${({ theme }) => theme.contentColor};
    background: ${({ theme }) => theme.contentBgColor};
`;

export const Content = (props: { children?: ReactNode }): JSX.Element => {
    const { children, ...rest } = props;
    return <StyledContent {...rest}>{!children ? undefined : children}</StyledContent>;
};
