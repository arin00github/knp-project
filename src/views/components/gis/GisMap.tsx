/**
 * [3D GIS] GIS 맵 컴포넌트
 * @file src/views/components/gis/GisMap.tsx
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-10-19, 최초 작성
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";

import axios from "axios";
import styled from "styled-components";

import MAP_POINT from "../../../assets/icons/map_point.png";
import SEARCH_LOCATION_MARKER from "../../../assets/icons/search_location.svg";
import { AssetPopupInfo, FeatureType } from "../../../services/interfaces";
import { InitDataState } from "../../../services/store/common/init-data-slice";
import {
    GisState,
    resetStoredTrailLayerSaveInfo,
    setStoredIsMapInit,
    setStoredIsPopupOpen,
    setStoredSelectedLayers,
    setStoredTrailLayerSearchLoading,
} from "../../../services/store/gis/gis-slice";
import { useAppDispatch, useAppSelector } from "../../../services/store/hooks";
import { LoadingSpinner } from "../common";

import { DEFAULT_LAYERS, DISALLOWED_LAYERS, LAYERS, SAFETY_MAPS, REFRESH_MAPS, WMS_LAYER_ID } from "./GIsConstant";
//import { GisControls } from "./GisControls";
//import { GisLayerGroup } from "./GisLayerGroup";
//import { GisLocationSearch } from "./GisLocationSearch";
import { GisPositionInfo } from "./GisWrapper";
//import { GisMultipleAssetPopup } from "./popup/GisMultipleAssetPopup";
//import { GisSingleAssetPopup } from "./popup/GisSingleAssetPopup";

declare const vw: any;

/**
 * GisWrapper에서 조회한 사용자 GIS 위치 정보
 * @typedef {Object} GisPositionInfo
 * @property {GisPositionInfo} gisPosition 사용자 GIS 위치 정보
 */
export interface GisMapProps {
    userGisPosition: GisPositionInfo;
}

/**
 * @name GisMap
 * @component
 * @author Ju Seongjin
 * @description [3D GIS] GIS 맵의 생성 및 자산 레이어 생성 처리 컴포넌트
 * @return {JSX.Element}
 */
export const GisMap = (props: GisMapProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const { userGisPosition } = props;

    const storedInitData = useAppSelector((state) => state.initData) as InitDataState;
    const { userAuth } = storedInitData;

    const storedGis = useAppSelector((state) => state.gis) as GisState;
    const {
        selectedLayers,
        selectedSafetyMapLayers,
        selectedRefreshMapLayers,
        moveCoordinates,
        isPopupOpen,
        trailLayerSearchAssetInfo,
        trailLayerSearchLoading,
        trailLayerSaveInfo,
    } = storedGis;
    console.log("selectedLayers", selectedLayers);

    const [vMap, setVMap] = useState() as any;
    const [popupInfo, setPopupInfo] = useState<AssetPopupInfo>();

    const [loadingMap, setLoadingMap] = useState<boolean>(true);

    const MARKER_ID = "point";

    /**
     * @name openInfoPopup
     * @function
     * @description 자산 정보 팝업 열기
     * @return {Number[]}
     */
    const openInfoPopup = useCallback(
        (windowPosition, features): void => {
            setPopupInfo({
                x: windowPosition.x,
                y: windowPosition.y,
                features: features,
            });
            dispatch(setStoredIsPopupOpen(true));
        },
        [dispatch]
    );

    /**
     * @name getBuffer
     * @function
     * @description 111,000KM 1도 단위의 마우스 클릭 영역 bbox 반환
     * 대략적인 마우스 클릭 크기에 맞는 BBOX 영역 계산
     * @return {Number[]}
     */
    const getBuffer = useCallback((vMapObject): number[] => {
        const position = vMapObject.getCurrentPosition().position;
        const z = position.z;
        const m = 1 / ((111000 / z) * 1.48 * 50);
        const h = 1 / ((111000 / z) * 1.85 * 50);
        return [m, h];
    }, []);

    /**
     * @name handleBaseMapClick
     * @async
     * @function
     * @description 3D 지도 영역 클릭 이벤트
     * @return {void}
     */
    const handleBaseMapClick = useCallback(
        async (windowPosition, cartographic, vMapObject): Promise<void> => {
            if (cartographic && cartographic.longitudeDD && cartographic.latitudeDD) {
                // 자산 팝업 초기화
                setPopupInfo(undefined);
                // 허용하지 않는 레이어 제거 (탐방로, 경계 등)
                const allowedLayers: string[] = [];
                selectedLayers.forEach(
                    (layer: string) => !DISALLOWED_LAYERS.includes(layer) && allowedLayers.push(layer)
                );
                selectedRefreshMapLayers.forEach((layer: { layerId: string; refreshTime: number }) =>
                    allowedLayers.push(layer.layerId)
                );

                let parks = "";
                userAuth?.npk_cds.forEach((npkCd: string) => {
                    parks += `'${npkCd}',`;
                });
                const sliceParks = parks.slice(0, -1);
                const filters = `npk_cd in(${sliceParks})`;

                if (allowedLayers.length > 0) {
                    const mh = getBuffer(vMapObject);
                    const min = [cartographic.longitudeDD - mh[0], cartographic.latitudeDD - mh[1]];
                    const max = [cartographic.longitudeDD + mh[0], cartographic.latitudeDD + mh[1]];
                    // 클릭 영역 bbox 생성
                    const currentBoundaryBox = min[0] + "," + min[1] + "," + max[0] + "," + max[1];
                    const url =
                        "/geoserver/innodep/wms?service=WFS" +
                        "&version=1.1.1" +
                        "&request=GetFeature" +
                        "&typename=" +
                        allowedLayers.join(",") +
                        "&outputFormat=application/json" +
                        "&srsname=EPSG:4326" +
                        "&cql_filter=BBOX(geom," +
                        currentBoundaryBox +
                        `,'EPSG:4326') AND ` +
                        encodeURIComponent(filters);
                    // TODO: WMS 방식의 GetFeatureInfo 처리
                    /* const url =
                        "/geoserver/innodep/wms?SERVICE=WMS" +
                        "&VERSION=1.1.1" +
                        "&REQUEST=GetFeatureInfo" +
                        "&FORMAT=image/png" +
                        "&QUERY_LAYERS=" +
                        allowedLayers.join(",") +
                        "&STYLES" +
                        "&LAYERS=" +
                        allowedLayers.join(",") +
                        "&exceptions=application/vnd.ogc.se_inimage" +
                        "&INFO_FORMAT=application/json" +
                        "&X=3" +
                        "&Y=3" +
                        "&feature_count=50" +
                        "&SRS=EPSG:4326" +
                        "&WIDTH=5" +
                        "&HEIGHT=5" +
                        "&BBOX=" +
                        currentBoundaryBox; */

                    const response = await axios(url, {
                        method: "GET",
                    });

                    if (response && response.status === 200) {
                        const features = response.data.features;
                        if (features && features.length > 0) {
                            openInfoPopup(windowPosition, features);
                        } else {
                            setPopupInfo(undefined);
                        }
                    }
                }
            }
        },
        [getBuffer, openInfoPopup, selectedLayers, selectedRefreshMapLayers, userAuth?.npk_cds]
    );

    /**
     * @name createWmsSafeMapLayerObject
     * @function
     * @description 생활안전지도 레이어 생성
     * @return {Number[]}
     */
    const createWmsSafeMapLayerObject = useCallback(
        (id: string, layer: string): void => {
            const wmsLayer = new vw.Layers();
            const wmsSource = new vw.source.TileWMS();
            wmsSource.setId(id);
            wmsSource.setLayers(layer);
            wmsSource.setFormat("image/png");
            wmsSource.setSrs("EPSG:4326");
            wmsSource.setProxy("");
            wmsSource.setUrl("/geoserver/innodep/wms?width=512&height=512");
            const wmsTile = new vw.layer.Tile(wmsSource);
            wmsLayer.add(wmsTile);
            vMap.onClick.addEventListener((...[windowPosition, , cartographic]: any) => {
                handleBaseMapClick(windowPosition, cartographic, vMap);
            });
        },
        [handleBaseMapClick, vMap]
    );

    /**
     * @name createWmsLayerObject
     * @function
     * @description WMS 레이어 생성
     * @return {Number[]}
     */
    const createWmsLayerObject = useCallback(
        (id: string, layers: string[]): void => {
            console.log("createWmsLayerObject");
            let parks = "";
            userAuth?.npk_cds.forEach((npkCd: string) => {
                parks += `'${npkCd}',`;
            });
            const sliceParks = parks.slice(0, -1);

            let filters = "";
            layers.forEach(() => {
                filters += `npk_cd in (${sliceParks});`;
            });

            const sliceFilters = filters.slice(0, -1);

            const wmsLayer = new vw.Layers();
            const wmsSource = new vw.source.TileWMS();
            wmsSource.setID(id);
            wmsSource.setLayers(layers.join(","));
            wmsSource.setFormat("image/png");
            wmsSource.setSrs("EPSG:4326");
            wmsSource.setProxy("");
            wmsSource.setUrl(
                `/geoserver/innodep/wms?width=512&height=512&cql_filter=${encodeURIComponent(sliceFilters)}`
            );
            const wmsTile = new vw.layer.Tile(wmsSource);
            wmsLayer.add(wmsTile);
            vMap.onClick.addEventListener((...[windowPosition, , cartographic]: any) => {
                handleBaseMapClick(windowPosition, cartographic, vMap);
            });
        },
        [handleBaseMapClick, userAuth?.npk_cds, vMap]
    );

    /**
     * @name createWmsLayer
     * @function
     * @description WMS 레이어 및 이벤트 리스터 초기화 및 생성 처리
     * @return {Number[]}
     */
    const createWmsLayer = useCallback(() => {
        console.log("createWmsLayer reset & create new one");
        if (vMap) {
            vMap.onClick._listeners = [];
            vMap.removeLayerElement(WMS_LAYER_ID);
            SAFETY_MAPS.forEach((safetyMapLayer: string) => {
                vMap.removeLayerElement(safetyMapLayer);
            });

            if (selectedLayers && selectedLayers.length > 0) {
                const copySelectedLayers = JSON.parse(JSON.stringify(selectedLayers));
                const findBndrLayerIdx = copySelectedLayers.findIndex(
                    (layer: string) => layer === LAYERS.PARK_BOUNDARY_LAYER
                );
                const bndrItem = copySelectedLayers.splice(findBndrLayerIdx, 1);
                console.log("bndrItem", bndrItem);
                copySelectedLayers.splice(0, 0, bndrItem[0]);
                console.log("copySelectedLayers", copySelectedLayers);

                const findVrteLayerIdx = copySelectedLayers.findIndex(
                    (layer: string) => layer === LAYERS.PARK_OFFICE_BOUNDARY_LAYER
                );
                const vrteItem = copySelectedLayers.splice(findVrteLayerIdx, 1);
                copySelectedLayers.splice(0, 0, vrteItem[0]);
                console.log("copySelectedLayers", copySelectedLayers);

                createWmsLayerObject(WMS_LAYER_ID, copySelectedLayers);
            }

            if (selectedSafetyMapLayers && selectedSafetyMapLayers.length > 0) {
                selectedSafetyMapLayers.forEach((safetyMapLayer: string) => {
                    createWmsSafeMapLayerObject(safetyMapLayer, safetyMapLayer);
                });
            }
        }
    }, [createWmsLayerObject, createWmsSafeMapLayerObject, selectedLayers, selectedSafetyMapLayers, vMap]);

    /**
     * @private
     * @description [useEffect hooks] 레이어 그룹(tree)에서 선택 레이어 변경 시, wms 레이어 재생성
     */
    useEffect(() => {
        if (selectedLayers) {
            createWmsLayer();
        }
    }, [createWmsLayer, selectedLayers]);

    useEffect(() => {
        if (vMap && moveCoordinates.length > 0) {
            vMap.clear();
            const pt = new vw.geom.Point(new vw.Coord(moveCoordinates[0], moveCoordinates[1]));
            pt.setId(MARKER_ID);
            pt.setImage(SEARCH_LOCATION_MARKER);
            pt.create();
            const currentPos = vMap.getCurrentPosition();
            vMap.moveTo(
                new vw.CameraPosition(
                    new vw.CoordZ(moveCoordinates[0], moveCoordinates[1], String(currentPos.position.z))
                ),
                new vw.Direction(
                    String(currentPos.direction.heading),
                    String(currentPos.direction.tilt),
                    String(currentPos.direction.roll)
                )
            );
        }
        if (vMap && moveCoordinates.length === 0) {
            if (!popupInfo?.searchTrail) {
                vMap.clear();
            }
        }
    }, [moveCoordinates, popupInfo?.searchTrail, vMap]);

    /**
     * @private
     * @description [useEffect hooks] 컴포넌트 init 맵 생성
     */
    useEffect(() => {
        let isComponentMounted = true;

        /**
         * 지도 생성 옵션
         * baseMapType: 초기 배경 지도 선택 (2D 지도 전용, 3D 에서 적용되지 않으므로 빈 값 처리)
         * layersArr: 레이어 목록 (2D 지도 전용, 3D 에서 적용되지 않으므로 빈 값 처리)
         * controlsDensity: 컨트롤 및 상호작용 도구 생성 관련  (2D 지도 전용, 3D 에서 적용되지 않으므로 빈 값 처리)
         * interactionDensity: 상호작용 밀도 관련 (2D 지도 전용, 3D 에서 적용되지 않으므로 빈 값 처리)
         * controlAutoArrange: 컨트롤 및 상호작용 도구, 맵크기에 따라 배치 및 visibility 적용 (2D 지도 전용, 3D 에서 적용되지 않으므로 false 처리)
         * homePosition: 홈의 카메라 위치 정보, (x:경도,Y:위도,Z:지면으로부터의 높이), (heading: 수평방향 회전각도, tilt(수직방향 회전각도), roll(카메라자체 회전각도))
         * initPosition	: 초기 카메라 위치 정보, (x:경도,Y:위도,Z:지면으로부터의 높이), (heading: 수평방향 회전각도, tilt(수직방향 회전각도), roll(카메라자체 회전각도))
         *
         * => x,y,z 에서 z 지면으로부터의 높이는 meter 단위
         */
        const mapOptions = new vw.MapOptions(
            "",
            "",
            vw.DensityType.BASIC,
            vw.DensityType.BASIC,
            false,
            new vw.CameraPosition(
                new vw.CoordZ(userGisPosition.position_x, userGisPosition.position_y, userGisPosition.position_z),
                new vw.Direction(
                    userGisPosition.camera_heading,
                    userGisPosition.camera_tilt,
                    userGisPosition.camera_roll
                )
            ),
            new vw.CameraPosition(
                new vw.CoordZ(userGisPosition.position_x, userGisPosition.position_y, userGisPosition.position_z),
                new vw.Direction(
                    userGisPosition.camera_heading,
                    userGisPosition.camera_tilt,
                    userGisPosition.camera_roll
                )
            )
        );
        const vMapObject = new vw.Map("vMap", mapOptions);
        setVMap(vMapObject);

        vw.ws3dInitCallBack = () => {
            if (isComponentMounted) {
                dispatch(setStoredSelectedLayers(DEFAULT_LAYERS));
                setLoadingMap(false);
                dispatch(setStoredIsMapInit(true));
            }
        };
        return () => {
            isComponentMounted = false;
        };
    }, [dispatch, userGisPosition]);

    return (
        <>
            {trailLayerSearchLoading && <LoadingSpinner isPage={true} />}
            {loadingMap && <StyledLoadingBackgroundDiv />}
            <StyledVMap id="vMap" />
            {/* <GisLocationSearch /> */}
            {/* {vMap && <GisControls vMap={vMap} userGisPosition={userGisPosition} />} */}
            {/* <GisLayerGroup /> */}
            {/* {isPopupOpen && popupInfo && !popupInfo.searchTrail && popupInfo.features.length === 1 && (
                <GisSingleAssetPopup popupInfo={popupInfo} />
            )}
            {isPopupOpen && popupInfo && !popupInfo.searchTrail && popupInfo.features.length > 1 && (
                <GisMultipleAssetPopup popupInfo={popupInfo} />
            )}
            {isPopupOpen && popupInfo && popupInfo.searchTrail && (
                <GisMultipleAssetPopup vMap={vMap} popupInfo={popupInfo} />
            )} */}
        </>
    );
};

/**
 * styled-components 및 styled interface 정의 영역
 */
const StyledVMap = styled.div`
    width: 100%;
    height: 100%;
`;

const StyledLoadingBackgroundDiv = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
