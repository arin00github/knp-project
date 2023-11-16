import { FormErrorMessage, FormLabel } from "@innodep/tms-react-ui";
import styled from "styled-components";

/**
 * styled-components 및 styled interface 정의 영역
 */
export const StyledFormLabel = styled(FormLabel)`
    display: inline-block;
    width: 100px;
    line-height: 24px;
    vertical-align: top;
    margin: 0 !important;
    font-size: 12px;
`;
export const StyledFormFieldWrap = styled.div`
    display: inline-block;
    width: calc(100% - 108px);
    line-height: 24px;
    vertical-align: top;
    margin-left: 8px;
    justify-content: space-between;
`;
export const StyledFormErrorMessage = styled(FormErrorMessage)`
    margin-bottom: -8px !important;
`;
export const StyledFormTextareaErrorMessage = styled(StyledFormErrorMessage)`
    margin-top: -2px !important;
`;
