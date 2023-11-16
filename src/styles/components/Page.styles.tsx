import { Stack } from "@innodep/tms-react-ui";
import styled from "styled-components";

export const StyledPageWrap = styled(Stack)`
    height: 100%;
`;

export const StyledPageLeft = styled.div<{ isSideBarOpen: boolean }>`
    width: ${(props) => (props.isSideBarOpen ? "34%" : "100%")};
    overflow: hidden;
`;

export const StyledPageRight = styled.div`
    width: 66%;
    border-left: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
`;
