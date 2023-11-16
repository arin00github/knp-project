import styled from "styled-components";

/**
 * styled-components 및 styled interface 정의 영역
 */
export const StyledGisAssetPopupHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 30px;
    gap: 8px;
    font-size: 12px;
    font-weight: 400;
    border-bottom: 1px solid ${({ theme }) => theme.proSideBarBorderColor};
    padding: 8px;
`;

export const StyledGisAssetPopupButtonWrap = styled.span`
    display: flex;
    align-items: center;
    font-size: 18px;
    path:hover {
        fill: ${({ theme }) => theme.proSideBarColor};
    }
`;

export const StyledGisAssetPopupTitle = styled.span`
    width: 212px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const StyledGisAssetPopupCloseButtonWrap = styled(StyledGisAssetPopupButtonWrap)`
    cursor: pointer;
    &:active {
        transform: translateY(1px);
    }
`;

export const StyledGisAssetPopupBody = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    font-size: 12px;
    font-weight: 400;
    height: calc(100% - 30px);
    gap: 8px;
    padding: 8px 16px;
    overflow-y: auto;
`;

export const StyledGisAssetPropsRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 20px;
    > div:first-child {
        width: 130px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    div:last-child {
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;
