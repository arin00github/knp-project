import React from "react";

import { FormControl, Stack } from "@innodep/tms-react-ui";

import ListPageBody from "./ListPageBody";
import ListPageHeader from "./ListPageHeader";

import {
    AssetGroupListItem,
    GetAssetGroupsResponse,
    GetLayerStylesResponse,
    GetLayerStylesResult,
    GetLayersResponse,
    GetLayersResult,
} from "@/services/api/layer/LayerInterface";
import LayerService from "@/services/api/layer/LayerService";
import { useAppDispatch } from "@/services/store/hooks";
import { sortArrayOfObjects } from "@/services/utils";
import { StyledPageWrap } from "@/styles";

/**
 * 자산종류 목록을 보여주는 테이블이 있는 페이지
 * @returns
 */
const AssetGroupListPage = () => {
    const [layers, setLayers] = React.useState<GetLayersResult[]>();
    const [layerStyles, setLayerStyles] = React.useState<GetLayerStylesResult[]>();

    const [tableData, setTableData] = React.useState<AssetGroupListItem[]>();

    const layerService = LayerService();

    /**
     * 자산종류 목록을 가져온다.
     */
    const getAssetGroups = React.useCallback(async (): Promise<GetAssetGroupsResponse> => {
        const res = await layerService.getAssetGroups();
        return new Promise((resolve, reject) => {
            if (res?.code === 200) {
                resolve(res as GetAssetGroupsResponse);
            } else {
                reject(res);
            }
        });
    }, [layerService]);

    /**
     * 레이어 목록을 가져온다.
     */
    const getLayers = React.useCallback(async (): Promise<GetLayersResponse> => {
        const res = await layerService.getLayers();
        return new Promise((resolve, reject) => {
            if (res?.code === 200) {
                return resolve(res as GetLayersResponse);
            } else {
                reject(res?.response);
            }
        });
    }, [layerService]);

    /**
     * 레이어 스타일 목록을 가져온다.
     */
    const getLayerStyle = React.useCallback(async (): Promise<GetLayerStylesResponse> => {
        const res = await layerService.getLayerStyles();
        return new Promise((resolve, reject) => {
            if (res?.code === 200) {
                return resolve(res as GetLayerStylesResponse);
            } else {
                reject(res?.response);
            }
        });
    }, [layerService]);

    /**
     * [Hooks] 레이어 목록, 레이어 스타일 목록, 자산종류 목록을 가져온다.
     */
    React.useEffect(() => {
        let isMounted = true;
        Promise.all([getLayers(), getLayerStyle(), getAssetGroups()]).then(([resObject, resObject2, resObject3]) => {
            setLayers(resObject.response.results);
            setLayerStyles(resObject2.response.results);
            setTableData(sortArrayOfObjects(resObject3.response.results, "layer_name"));
        });

        return () => {
            isMounted = false;
        };
    }, [getAssetGroups, getLayerStyle, getLayers]);

    return (
        <StyledPageWrap>
            <ListPageHeader />
            {layers && layerStyles && tableData && (
                <ListPageBody layerStyles={layerStyles} layers={layers} data={tableData} />
            )}
        </StyledPageWrap>
    );
};

export default AssetGroupListPage;
