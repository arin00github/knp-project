import { ErrorResponse, TmsKnpResponse } from "../HttpService";

import { ASSET_TYPE, LAYER_ID } from "@/services/constant";

export interface GetLayersResult {
    layer_id: string;
    layer_name: string;
    description: string;
    resource: boolean;
    require: boolean;
    ordering: number;
    reg_date: string;
    upd_date: string;
    storage: string;
    readonly: boolean;
}

export interface GetLayersResponse extends TmsKnpResponse {
    response: {
        count: number;
        results: GetLayersResult[];
        total_count: number;
    };
}

/**
 * get layer styles 레이어 스타일 목록 API interface
 */
export interface GetLayerStylesResult {
    layer_id: LAYER_ID;
    asset_type_cd: ASSET_TYPE;
    image: string;
    image_type: string;
}

export interface GetLayerStylesResponse extends TmsKnpResponse {
    response: {
        results: GetLayerStylesResult[];
        total_count: number;
    };
}

/**
 * 자산종류 레이어 API interface
 */

export interface AttributesType {
    name: string;
    comment: string;
    type: string;
    type_cd: string;
}

export interface AttributesGetType extends AttributesType {
    ordering: number;
    exec?: "" | "ADD" | "DROP" | "ALTER";
}

export interface AssetGroupListItem {
    layer_id: string;
    layer_name: string;
    ordering: number;
    reg_date: string;
    upd_date: string;
    icon: { asset_type_cd: string; image: string; image_type: string; image_size: string };
}

export interface GetAssetGroupsResponse extends TmsKnpResponse {
    response: {
        results: AssetGroupListItem[];
        total_count: number;
    };
}
export interface AssetGroupDetail extends AssetGroupListItem {
    attributes: AttributesGetType[];
}

export interface GetAssetGroupDetailResponse extends TmsKnpResponse {
    response: AssetGroupDetail;
}

export interface LayerApiInterface {
    getLayers(): Promise<GetLayersResponse | ErrorResponse | undefined>;
    getLayerStyles(): Promise<GetLayerStylesResponse | ErrorResponse | undefined>;
    getAssetGroups(): Promise<GetAssetGroupsResponse | ErrorResponse | undefined>;
    getAssetGroupDetail(layer_id: string): Promise<GetAssetGroupDetailResponse | ErrorResponse | undefined>;
}
