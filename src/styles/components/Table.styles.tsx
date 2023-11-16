import styled from "styled-components";

import { StyledLayoutBodyWithHeader } from "./Layout.styles";

/**
 * styled-components 및 styled interface 정의 영역
 */
export const StyledTableWrap = styled(StyledLayoutBodyWithHeader)`
    position: relative;
`;

export const StyledTableIconButtonWrap = styled.div`
    &:active {
        transform: translateY(1px);
    }
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    > svg {
        width: 20px;
        height: 20px;
    }
`;
