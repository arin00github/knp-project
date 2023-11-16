import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@innodep/tms-react-ui";
import styled from "styled-components";

/**
 * styled-components 및 styled interface 정의 영역
 */
export const StyledDialogWrapper = styled(Dialog)``;

export const StyledDialogHeader = styled(DialogHeader)`
    font-size: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;

export const StyledDialogBody = styled(DialogBody)`
    padding: 16px;
    font-size: 14px;
`;

export const StyledDialogBodyMessage = styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;
    padding: 24px 0;
    white-space: pre-line;
`;

export const StyledDialogFooter = styled(DialogFooter)`
    padding: 8px 16px 16px 16px;
    justify-content: center;
`;
