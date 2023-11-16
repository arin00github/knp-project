import React, { useCallback, useEffect, useState } from "react";

import { NewTmsKnpInterface } from "../../../services/api/tmsKnp/TmsKnpApi";
import { GetUserPropResponse, GetUserPropResult } from "../../../services/api/tmsKnp/TmsKnpInterface";
import { resetStoredGis } from "../../../services/store/gis/gis-slice";
import { useAppDispatch } from "../../../services/store/hooks";

import { MAP_CONFIG } from "./GIsConstant";
import { GisMap } from "./GisMap";

declare const vw: any;
export interface GisPositionInfo {
    position_x: string;
    position_y: string;
    position_z: string;
    camera_heading: string;
    camera_tilt: string;
    camera_roll: string;
}

/** @const {string} */
const GIS_PROP_KEY = "GIS_POSITION";

/**
 * @name GisWrapper
 * @component
 * @author Ju Seongjin
 * @description [3D GIS] GIS 컴포넌트를 감싸는 가장 상위 컴포넌트로, 맵 생성시에 필요한 초기 데이터의 통신 처리
 * @return {JSX.Element}
 */
export const GisWrapper = (): JSX.Element => {
    const dispatch = useAppDispatch();

    /** @const {GisPositionInfo} */
    const [userGisPosition, setUserGisPosition] = useState<GisPositionInfo>();

    /**
     * @name getUserProp
     * @async
     * @function
     * @description gis 개인별 설정 정보를 조회
     * @return {Promise<GetUserPropResponse>}
     */
    const getUserProp = useCallback(async (): Promise<GetUserPropResponse> => {
        const tmsKnpService = NewTmsKnpInterface();
        const getUserPropResponse = await tmsKnpService.getUserProp();
        return new Promise((resolve, reject) => {
            if (getUserPropResponse?.code === 200) {
                resolve(getUserPropResponse as GetUserPropResponse);
            } else {
                reject(getUserPropResponse?.message);
            }
        });
    }, []);

    useEffect(() => {
        let isComponentMounted = true;
        getUserProp().then((getUserPropRes) => {
            if (isComponentMounted) {
                const userProps = getUserPropRes.response.results;
                const gisProp = userProps.find((prop: GetUserPropResult) => prop.prop_key === GIS_PROP_KEY);
                if (gisProp) {
                    setUserGisPosition(JSON.parse(gisProp.prop_value));
                } else {
                    setUserGisPosition(MAP_CONFIG);
                }
            }
        });

        return () => {
            isComponentMounted = false;
        };
    }, [getUserProp]);

    /**
     * @private
     * @description [useEffect hooks] 컴포넌트 mount / unmount 시 store 초기화
     */
    useEffect(() => {
        dispatch(resetStoredGis());
        return () => {
            dispatch(resetStoredGis());
        };
    }, [dispatch]);

    return <>{userGisPosition && <GisMap userGisPosition={userGisPosition}></GisMap>}</>;
};
