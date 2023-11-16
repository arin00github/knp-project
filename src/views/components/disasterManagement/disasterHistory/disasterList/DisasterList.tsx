import React, { useCallback, useEffect, useState } from "react";

import { useHistory } from "react-router";

import { NewTmsKnpNoticeInterface } from "../../../../../services/api/tmsKnpNotice/TmsKnpNoticeApi";
import {
    GetSituationNoticeResponse,
    GetSituationNoticeResult,
} from "../../../../../services/api/tmsKnpNotice/TmsKnpNoticeInterface";
import { setStoredDisastersLoading } from "../../../../../services/store/disasterManagement/disasters-slice";
import { useAppDispatch, useAppSelector } from "../../../../../services/store/hooks";

import { DisasterListHeader } from "./DisasterListHeader";
import { DisasterListTable } from "./DisasterListTable";

export const DisasterList = (): JSX.Element => {
    const [disasters, setDisasters] = useState<GetSituationNoticeResult[]>([]);

    const dispatch = useAppDispatch();

    const storedDisasters = useAppSelector((state) => state.disasters);
    const { loading } = storedDisasters;

    const history = useHistory();

    /**
     * @private
     * @description [useEffect hooks] URL이 변경되면, 데이터 재조회 실행
     */
    useEffect(() => {
        if (history.location) {
            dispatch(setStoredDisastersLoading(true));
        }
    }, [dispatch, history.location]);

    /**
     * @name getSituationNotice
     * @async
     * @function
     * @description 상황 전파 이력 요청
     * @return {Promise<GetSituationNoticeResponse>}
     */
    const getSituationNotice = useCallback(async (): Promise<GetSituationNoticeResponse> => {
        const tmsKnpNoticeService = NewTmsKnpNoticeInterface();
        const getSituationNoticeRes = await tmsKnpNoticeService.getSituationNotice({});
        console.log("getSituationlist", getSituationNoticeRes?.response?.results);

        //STUDY Promise로 반환하는 이유
        return new Promise((resolve, reject) => {
            if (getSituationNoticeRes?.code === 200) {
                resolve(getSituationNoticeRes as GetSituationNoticeResponse);
            } else {
                reject(getSituationNoticeRes?.message);
            }
        });
    }, []);

    useEffect(() => {
        if (loading) {
            getSituationNotice().then((getSituationNoticeRes) => {
                setDisasters(getSituationNoticeRes.response.results);
                dispatch(setStoredDisastersLoading(false));
            });
        }
    }, [dispatch, getSituationNotice, loading]);

    return (
        <div style={{ height: "100%" }}>
            <DisasterListHeader />
            <DisasterListTable disasters={disasters} />
        </div>
    );
};
