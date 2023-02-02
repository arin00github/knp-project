/**
 * header(상단 헤더) 레이아웃 부모 컴포넌트
 * @file src/views/layouts/Header.tsx
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-07-26, 최초 작성
 */
import React, { ReactNode } from "react";

import styled from "styled-components";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledHeader = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.layoutHeaderBgColor};
    padding: 8px 16px 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    min-height: 50px;
    border-bottom: 1px solid ${({ theme }) => theme.layoutHeaderBorderColor};
`;

export const Header = (props: { children?: ReactNode }): JSX.Element => {
    const { children, ...rest } = props;
    return <StyledHeader {...rest}>{!children ? undefined : children}</StyledHeader>;
};
