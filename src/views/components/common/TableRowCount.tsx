/**
 * [공통컴포넌트] 테이블의 row 개수 컴포넌트
 * @file src/views/components/common/TableRowCount.tsx
 * @author Jang Jeongwon
 * @version 1.0
 * @see none
 * @history
 * - 2022-10-26, 최초 작성
 */
import React from "react";

import styled from "styled-components";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledCountWrap = styled.div`
    position: absolute;
    bottom: 16px;
    height: 30px;
    padding-top: 16px;
    gap: 4px;
    line-height: 0;
`;
const StyledCountItem = styled.div`
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    gap: 4px;
    margin-right: 4px;
`;
const StyledNumber = styled.strong<{ color: string }>`
    color: ${({ color }) => color};
    font-weight: 700;
`;
const StyledDivider = styled.span`
    padding: 0 4px;
`;

/**
 * component interface 정의 영역
 */
interface TableRowCountProps {
    totalCount?: number;
    selectedCount?: number;
    unit?: string;
}

export const TableRowCount = (props: TableRowCountProps) => {
    const { totalCount, selectedCount, unit = "개" } = props;

    return (
        <StyledCountWrap>
            <StyledCountItem>
                전체
                <StyledNumber color={"#2775c4"}>
                    {totalCount?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </StyledNumber>
                {unit}
            </StyledCountItem>
            {selectedCount && selectedCount > 0 ? (
                <StyledCountItem>
                    <StyledDivider>/</StyledDivider>
                    선택
                    <StyledNumber color={"#e12d2d"}>
                        {selectedCount?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </StyledNumber>
                    {unit}
                </StyledCountItem>
            ) : undefined}
        </StyledCountWrap>
    );
};
