import { Stack } from "@innodep/tms-react-ui";
import styled from "styled-components";

/**
 * styled-components 및 styled interface 정의 영역
 */
export const StyledPageDiv = styled.div`
    width: 100%;
    height: 100%;
`;
export const StyledSubPageDiv = styled(Stack)`
    height: 100%;
    gap: 0;
`;
export const StyledSubPageContent = styled.div`
    width: 90%;
`;

export const StyledLayoutHeader = styled.div`
    font-size: 14px;
    height: 40px;
    padding: 16px 16px 0 16px;
    align-items: center;
`;
export const StyledLayoutBodyWithHeader = styled.div`
    height: calc(100% - 40px);
    padding: 16px;
    overflow-y: auto;
`;
export const StyledLayoutBodyWithFooter = styled.div`
    height: calc(100% - 56px);
    padding: 16px 16px 0 16px;
    overflow-y: auto;
`;
export const StyledLayoutBodyWithHeaderFooter = styled.div`
    height: calc(100% - 96px);
    padding: 16px 16px 0 16px;
    overflow-y: auto;
`;
export const StyledLayoutFooter = styled(Stack)`
    justify-content: flex-end;
    height: 56px;
    padding: 16px;
`;
