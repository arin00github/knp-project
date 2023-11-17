import { http, HttpResponse } from "msw";

import assetGroupList from "../data/assetGroupList";
import checkLogin from "../data/checkLogin";
import codeAssetType from "../data/codeAssetType";
import codeDsst from "../data/codeDsst";
import codeNPK from "../data/codeNPK";
import codeNPO from "../data/codeNPO";
import codeSitu from "../data/codeSitu";
import layerList from "../data/layerList";
import styleList from "../data/styleList";
import userAuth from "../data/userAuth";

import { successResponse } from "./responseFormat";

import commonCode from "@/data/commonCode";
import { AUTH_API_URL, CODE_API_URL, LAYER_API_URL } from "@/services/api/pathCollection";

export const handlers = [
    http.get(AUTH_API_URL.checkLogin_test, () => {
        console.log(`[MSW] check-login`);
        return HttpResponse.json(successResponse(checkLogin));
    }),
    http.post(AUTH_API_URL.userAuth_test, () => {
        console.log(`[MSW] user-auth`);
        return HttpResponse.json(successResponse(userAuth));
    }),
    /***************************
     ******** Category ********
     ***************************** */
    http.post(LAYER_API_URL.getLayerList_test, () => {
        console.log(`[MSW] layer-list`);
        return HttpResponse.json(successResponse(layerList));
    }),
    http.post(LAYER_API_URL.getStyleList_test, () => {
        return HttpResponse.json(successResponse(styleList));
    }),
    http.post(LAYER_API_URL.getAssetGroups_test, () => {
        console.log(`[MSW] asset-group`);
        return HttpResponse.json(successResponse(assetGroupList));
    }),
    http.post(CODE_API_URL.getCommonCode_test, async ({ request }) => {
        return HttpResponse.json(successResponse(commonCode));
    }),
    http.post(CODE_API_URL.getCodeInfo_test, async ({ request }) => {
        const reqObject = await request.json();
        const { p_code } = reqObject as Record<string, string>;
        console.log(`[MSW] code-info request: ${p_code}`);

        switch (p_code) {
            case "NPK":
                return HttpResponse.json(successResponse(codeNPK));
            case "NPO":
                return HttpResponse.json(successResponse(codeNPO));
            case "DSST":
                return HttpResponse.json(successResponse(codeDsst));
            case "SITU":
                return HttpResponse.json(successResponse(codeSitu));
            case "ASSET_TYPE":
                return HttpResponse.json(successResponse(codeAssetType));
            default:
                return HttpResponse.error();
        }
    }),
];
