import React, { useLayoutEffect } from "react";

import styled from "styled-components";

import { resetStoredGis } from "../../../../../../services/store/gis/gis-slice";
import { useAppDispatch, useAppSelector } from "../../../../../../services/store/hooks";
import { ReportDisasterForm } from "../../../../reportDisaster/ReportDisasterForm";

const StyledWrap = styled.div`
    height: 100%;
`;

export const EditResponse = () => {
    const dispatch = useAppDispatch();

    const storedResponses = useAppSelector((state) => state.responses);
    const { selectedRow, selectedRowIndex, isMapShow } = storedResponses;

    /**
     * @private
     * @description [useEffect hooks] 컴포넌트 mount / unmount 시 store 초기화
     */
    useLayoutEffect(() => {
        dispatch(resetStoredGis());
        return () => {
            dispatch(resetStoredGis());
        };
    }, [dispatch]);

    return (
        <StyledWrap>
            <ReportDisasterForm responseDetail={selectedRow} responseIndex={selectedRowIndex} />
            {/* <EditResponseMapModal responseDetail={selectedRow} isShow={isMapShow} /> */}
        </StyledWrap>
    );
};
