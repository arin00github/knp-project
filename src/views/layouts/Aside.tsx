/**
 * Aside(사이드) 레이아웃 부모 컴포넌트
 * @file src/views/layouts/Aside.tsx
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
const StyledAside = styled.div`
    height: 100%;
    overflow: hidden;
`;

export const Aside = (props: { children?: ReactNode }): JSX.Element => {
    const { children, ...rest } = props;
    return <StyledAside {...rest}>{!children ? undefined : children}</StyledAside>;
};
