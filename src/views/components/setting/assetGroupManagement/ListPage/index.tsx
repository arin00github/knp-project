import React from "react";

import { setLocale } from "yup";

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
import { sortArrayOfObjects } from "@/services/utils";
import { StyledPageWrap } from "@/styles";
import { TableLoading } from "@/views/components/common/TableLoading";

/**
 * 자산종류 목록을 보여주는 테이블이 있는 페이지
 * @returns
 */
const AssetGroupListPage = () => {
    const [tableData, setTableData] = React.useState<AssetGroupListItem[]>();

    const [tableLoading, setTableLoading] = React.useState<boolean>(true);

    /**
     * 자산종류 목록을 가져온다.
     */
    const getAssetGroups = React.useCallback(async (): Promise<GetAssetGroupsResponse> => {
        const layerService = LayerService();
        const res = await layerService.getAssetGroups();
        return new Promise((resolve, reject) => {
            if (res?.code === 200) {
                resolve(res as GetAssetGroupsResponse);
            } else {
                reject(res);
            }
        });
    }, []);

    /**
     * [Hooks] 레이어 목록, 레이어 스타일 목록, 자산종류 목록을 가져온다.
     */
    React.useEffect(() => {
        let isMounted = true;
        Promise.all([getAssetGroups()]).then(([resObject3]) => {
            setTableLoading(false);

            setTableData(sortArrayOfObjects(resObject3.response.results, "layer_name"));
        });

        return () => {
            isMounted = false;
        };
    }, [getAssetGroups]);

    return (
        <StyledPageWrap flexDirection="column">
            <ListPageHeader />
            {tableLoading && <TableLoading />}
            {tableData && <ListPageBody data={tableData} />}
        </StyledPageWrap>
    );
};

export default AssetGroupListPage;
