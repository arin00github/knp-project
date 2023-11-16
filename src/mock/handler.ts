import { http, HttpResponse } from "msw";

import checkLogin from "../data/checkLogin.json";
import codeAssetType from "../data/codeAssetType.json";
import codeDsst from "../data/codeDsst.json";
import codeNPK from "../data/codeNPK.json";
import codeNPO from "../data/codeNPO.json";
import codeSitu from "../data/codeSitu.json";
import layerList from "../data/layerList.json";
import styleList from "../data/styleList.json";
import userAuth from "../data/userAuth.data.json";

import { successResponse } from "./responseFormat";

import { AUTH_API_URL, CODE_API_URL, LAYER_API_URL } from "@/services/api/pathCollection";

export const handlers = [
    http.get(AUTH_API_URL.checkLogin_test, () => {
        return HttpResponse.json(successResponse(checkLogin));
    }),
    http.post(AUTH_API_URL.userAuth_test, () => {
        return HttpResponse.json(successResponse(userAuth));
    }),
    /***************************
     ******** Category ********
     ***************************** */
    http.post(LAYER_API_URL.getLayerList_test, () => {
        return HttpResponse.json(successResponse(layerList));
    }),
    http.post(CODE_API_URL.getCodeInfo_test, async ({ request }) => {
        const reqObject = await request.json();
        const { p_code } = reqObject as Record<string, string>;
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
