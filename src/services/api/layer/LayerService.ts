import { ErrorResponse, HTTP_REQEST, executeRequest } from "../HttpService";
import { LAYER_API_URL, configureUrl } from "../pathCollection";

import {
    GetAssetGroupDetailResponse,
    GetAssetGroupsResponse,
    GetLayerStylesResponse,
    GetLayersResponse,
    LayerApiInterface,
} from "./LayerInterface";

export class LayerHttp implements LayerApiInterface {
    public async getLayers(): Promise<GetLayersResponse | ErrorResponse | undefined> {
        const url = configureUrl({
            testurl: LAYER_API_URL.getLayerList_test,
            devurl: LAYER_API_URL.getLayerList_dev,
        });

        const resObject = await executeRequest(url, { ...HTTP_REQEST });
        if (resObject) {
            switch (resObject.status) {
                case 200:
                    return resObject.data as GetLayersResponse;
                case 401:
                    window.location.reload();
                    break;
                default:
                    return resObject.data as ErrorResponse;
            }
        } else {
            return undefined;
        }
    }

    public async getLayerStyles(): Promise<GetLayerStylesResponse | ErrorResponse | undefined> {
        const url = configureUrl({
            testurl: LAYER_API_URL.getStyleList_test,
            devurl: LAYER_API_URL.getStyleList_dev,
        });

        const resObject = await executeRequest(url, { ...HTTP_REQEST });
        if (resObject) {
            switch (resObject.status) {
                case 200:
                    return resObject.data as GetLayerStylesResponse;
                case 401:
                    window.location.reload();
                    break;
                default:
                    return resObject.data as ErrorResponse;
            }
        } else {
            return undefined;
        }
    }

    public async getAssetGroups(): Promise<GetAssetGroupsResponse | ErrorResponse | undefined> {
        const url = configureUrl({
            testurl: LAYER_API_URL.getAssetGroups_test,
            devurl: LAYER_API_URL.getAssetGroups_dev,
        });

        const resObject = await executeRequest(url, { ...HTTP_REQEST });
        if (resObject) {
            switch (resObject.status) {
                case 200:
                    return resObject.data as GetAssetGroupsResponse;
                case 401:
                    window.location.reload();
                    break;
                default:
                    return resObject.data as ErrorResponse;
            }
        } else {
            return undefined;
        }
    }
    public async getAssetGroupDetail(
        layer_id: string
    ): Promise<GetAssetGroupDetailResponse | ErrorResponse | undefined> {
        const url = configureUrl({
            testurl: LAYER_API_URL.getAssetGroupDetail_test,
            devurl: LAYER_API_URL.getAssetGroupDetail_dev,
        });

        const resObject = await executeRequest(url, { ...HTTP_REQEST, data: { layer_id } });
        if (resObject) {
            switch (resObject.status) {
                case 200:
                    return resObject.data as GetAssetGroupDetailResponse;
                case 401:
                    window.location.reload();
                    break;
                default:
                    return resObject.data as ErrorResponse;
            }
        } else {
            return undefined;
        }
    }
}

const LayerService = (): LayerApiInterface => {
    return new LayerHttp();
};

export default LayerService;
