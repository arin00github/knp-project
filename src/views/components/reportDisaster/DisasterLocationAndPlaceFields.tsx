import React, { useCallback, useEffect, useState } from "react";

import { Button, FormControl, Input } from "@innodep/tms-react-ui";
import { Field, FieldProps } from "formik";
import { MdLocationOn } from "react-icons/md";
import styled from "styled-components";

//import PLAY_LOADING_IMG from "../../../assets/images/play-loading.gif";
import { NewTmsKnpInterface } from "../../../services/api/tmsKnp/TmsKnpApi";
import {
    GetSearchAddressByCoordsResponse,
    GetTrailLayerIntersectsResponse,
    GetTrailLayerIntersectsResult,
} from "../../../services/api/tmsKnp/TmsKnpInterface";
import { TRAIL_VICINITY_IN, TRAIL_VICINITY_OUT } from "../../../services/constant";
import { setStoredResponsesIsMapShow } from "../../../services/store/disasterManagement/responses-slice";
import { setStoredOnClickMapLocation } from "../../../services/store/gis/gis-slice";
import { useAppDispatch, useAppSelector } from "../../../services/store/hooks";
import { StyledFormFieldWrap, StyledFormLabel } from "../../../styles/components/Form.styles";

interface DisasterLocationAndPlaceFieldsProps {
    editable: boolean;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    initialLocation: string;
}

// Field 이름 상수 선언
const LOCATION_FIELD = "situation_location";
const PLACE_NAME_FIELD = "situation_place_name";
const MESSAGE_TRAIL_VICINITY_FIELD = "situation_message.trail_vicinity";

export const DisasterLocationAndPlaceFields = (props: DisasterLocationAndPlaceFieldsProps): JSX.Element => {
    const { editable, setFieldValue, initialLocation } = props;

    const dispatch = useAppDispatch();

    const storedGis = useAppSelector((state) => state.gis);
    const { moveCoordinates, onClickMapLocation, isMapInit } = storedGis;

    const [mapOnclickToggle, setMapOnClickToggle] = useState<boolean>(false);

    /**
     * @name getSearchAddressByCoords
     * @async
     * @function
     * @param {string} coordinates "," 콤마로 구분된 좌표 문자열 경도,위도
     * @description 좌표를 통한 주소 검색 처리
     * @return {Promise<GetSearchAddressByCoordsResponse>}
     */
    const getSearchAddressByCoords = useCallback(
        async (coordinates: string[] | string[][]): Promise<GetSearchAddressByCoordsResponse> => {
            const tmsKnpService = NewTmsKnpInterface();
            const getSearchCoordRes = await tmsKnpService.getSearchAddressByCoords({
                lng: Number(coordinates[0]),
                lat: Number(coordinates[1]),
            });
            return new Promise((resolve, reject) => {
                if (getSearchCoordRes?.code === 200) {
                    resolve(getSearchCoordRes as GetSearchAddressByCoordsResponse);
                } else {
                    reject(getSearchCoordRes?.message);
                }
            });
        },
        []
    );

    /**
     * @name getTrailLayerIntersects
     * @async
     * @function
     * @param {string} coordinates "," 콤마로 구분된 좌표 문자열 경도,위도
     * @description 좌표를 통한 탐방로 인접여부 체크
     * @return {Promise<GetTrailLayerIntersectsResponse>}
     */
    const getTrailLayerIntersects = useCallback(
        async (coordinates: string[] | string[][]): Promise<GetTrailLayerIntersectsResponse> => {
            const tmsKnpService = NewTmsKnpInterface();
            const getIntersectsRes = await tmsKnpService.getTrailLayerIntersects({
                geom: `POINT(${coordinates[0]} ${coordinates[1]})`,
            });

            return new Promise((resolve, reject) => {
                if (getIntersectsRes?.code === 200) {
                    resolve(getIntersectsRes as GetTrailLayerIntersectsResponse);
                } else {
                    reject(getIntersectsRes?.message);
                }
            });
        },
        []
    );

    useEffect(() => {
        let isComponentMounted = true;
        if (moveCoordinates && moveCoordinates.length > 0) {
            Promise.all([getSearchAddressByCoords(moveCoordinates), getTrailLayerIntersects(moveCoordinates)]).then(
                ([getAddressByCoordRes, getIntersectsRes]) => {
                    if (isComponentMounted) {
                        const newLocation = `${moveCoordinates[0]},${moveCoordinates[1]}`;
                        const newPlaceName =
                            getAddressByCoordRes.response.results.length > 0
                                ? getAddressByCoordRes.response.results[0].address
                                : "";
                        const trailVicinity =
                            getIntersectsRes.response.total_count > 0 ? TRAIL_VICINITY_IN : TRAIL_VICINITY_OUT;
                        setFieldValue(LOCATION_FIELD, newLocation);
                        newLocation !== initialLocation && setFieldValue(PLACE_NAME_FIELD, newPlaceName);
                        setFieldValue(MESSAGE_TRAIL_VICINITY_FIELD, trailVicinity);
                    }
                }
            );
        }
        return () => {
            isComponentMounted = false;
        };
    }, [getSearchAddressByCoords, getTrailLayerIntersects, initialLocation, moveCoordinates, setFieldValue]);

    /**
     * @name handleGetCoordinatesClick
     * @function
     * @description 맵 클릭 시 좌표 반환 이벤트 활성화/비활성화 처리
     * @return {void}
     */
    const handleGetCoordinatesClick = useCallback((): void => {
        dispatch(setStoredResponsesIsMapShow(true));
        if (editable) {
            dispatch(setStoredOnClickMapLocation(!mapOnclickToggle));
        }
    }, [dispatch, editable, mapOnclickToggle]);

    /**
     * @private
     * @description [useEffect hooks] 컴포넌트 unmount 시 store 초기화
     */
    useEffect(() => {
        return () => {
            dispatch(setStoredResponsesIsMapShow(false));
        };
    }, [dispatch]);

    /**
     * @private
     * @description [useEffect hooks] 맵 활성 여부 저장
     */
    useEffect(() => {
        setMapOnClickToggle(onClickMapLocation);
    }, [onClickMapLocation]);

    return (
        <>
            <Field name={"situation_location"}>
                {({ field }: FieldProps) => (
                    <FormControl size={"sm"} required disabled={!editable} readOnly>
                        <StyledFormLabel>위/경도</StyledFormLabel>
                        <StyledFormFieldWrap>
                            <StyledAddressInputWrap>
                                <Input id={field.name} placeholder={"지도에서 위치를 선택하세요."} {...field} />
                                {isMapInit ? (
                                    <Button size={"sm"} style={{ padding: 0 }} onClick={handleGetCoordinatesClick}>
                                        <MdLocationOn size="70%" />
                                    </Button>
                                ) : (
                                    <Button size={"sm"} style={{ padding: 0 }}>
                                        {/* <img
                                            src={PLAY_LOADING_IMG}
                                            style={{ width: "16px", height: "16px" }}
                                            alt="play loading"
                                        /> */}
                                    </Button>
                                )}
                            </StyledAddressInputWrap>
                        </StyledFormFieldWrap>
                    </FormControl>
                )}
            </Field>
        </>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledAddressInputWrap = styled.div`
    width: 100%;
    display: flex;
`;
