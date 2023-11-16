import React, { useCallback, useEffect, useState } from "react";

import { useHistory } from "react-router";
import styled from "styled-components";

import { NewTmsKnpNoticeInterface } from "../../../../../../services/api/tmsKnpNotice/TmsKnpNoticeApi";
import {
    GetSituationResponseResponse,
    GetSituationResponseResult,
} from "../../../../../../services/api/tmsKnpNotice/TmsKnpNoticeInterface";
import { setStoredResponsesLoading } from "../../../../../../services/store/disasterManagement/responses-slice";
import { useAppDispatch, useAppSelector } from "../../../../../../services/store/hooks";

import { ResponseListTable } from "./ResponseListTable";

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledWrap = styled.div`
    height: 100%;
`;
interface ResponseListProps {
    disasterId: string;
}

export const ResponseList = (props: ResponseListProps) => {
    const { disasterId } = props;
    const dispatch = useAppDispatch();
    const storedResponses = useAppSelector((state) => state.responses);
    const { loading } = storedResponses;

    const history = useHistory();

    const [responses, setResponses] = useState<GetSituationResponseResult[]>([]);

    /**
     * @private
     * @description [useEffect hooks] URL이 변경되면, 데이터 재조회 실행
     */
    useEffect(() => {
        if (history.location) {
            dispatch(setStoredResponsesLoading(true));
        }
    }, [dispatch, history.location]);

    /**
     * @name getSituationResponse
     * @async
     * @function
     * @description 대응 SOP 이력 요청
     * @return {Promise<GetSituationResponseResponse>}
     */
    const getSituationResponse = useCallback(async (disasterId: string): Promise<GetSituationResponseResponse> => {
        const tmsKnpNoticeService = NewTmsKnpNoticeInterface();
        const getSituationResponseResponse = await tmsKnpNoticeService.getSituationResponse({
            situation_uuid: disasterId,
        });
        return new Promise((resolve, reject) => {
            if (getSituationResponseResponse?.code === 200) {
                resolve(getSituationResponseResponse as GetSituationResponseResponse);
            } else {
                reject(getSituationResponseResponse?.message);
            }
        });
    }, []);

    useEffect(() => {
        if (loading) {
            getSituationResponse(disasterId).then((getSituationResponseResponse) => {
                setResponses(getSituationResponseResponse.response.results);
                dispatch(setStoredResponsesLoading(false));

                // 결과가 없으면 상황전파이력 페이지로 이동
                if (getSituationResponseResponse.response.totalCount === 0) {
                    history.replace(`/disaster-management/disaster-history`);
                }
            });
        }
    }, [disasterId, dispatch, getSituationResponse, history, loading]);

    return (
        <StyledWrap>
            <ResponseListTable responses={responses} />
        </StyledWrap>
    );
};
