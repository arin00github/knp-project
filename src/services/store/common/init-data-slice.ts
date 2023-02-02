import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { Menu } from "../../../views/components/common";
import { CheckLoginResult } from "../../api/auth/AuthInterface";
import {
    GetCodeInfoResult,
    GetLayersResult,
    GetLayerStylesResult,
    GetResourceInfoResult,
    GetUserAuthResult,
} from "../../api/tmsKnp/TmsKnpInterface";

export interface InitDataState {
    loginUserInfo?: CheckLoginResult;
    userAuth?: GetUserAuthResult;
    layers: GetLayersResult[];
    layerStyles: GetLayerStylesResult[];
    resources: GetResourceInfoResult[];
    parkCodes: GetCodeInfoResult[]; // 국립공원 코드
    authParkCodes: GetCodeInfoResult[]; // 사용자권한정보의 국립코드 배열에 포함된 국립공원 코드
    parkOfficeCodes: GetCodeInfoResult[]; // 국립공원사무소 코드
    assetTypeCodes: GetCodeInfoResult[]; // 자산타입 코드
    disasterCodes: GetCodeInfoResult[]; // 재난구분 코드
    situationCodes: GetCodeInfoResult[]; // 재난상황 코드
    authMenus: Menu[];
}

const initialState: InitDataState = {
    layers: [],
    layerStyles: [],
    resources: [],
    parkCodes: [],
    authParkCodes: [],
    parkOfficeCodes: [],
    assetTypeCodes: [],
    disasterCodes: [],
    situationCodes: [],
    authMenus: [],
};

export const initDataSlice = createSlice({
    name: "initData",
    initialState: initialState,
    reducers: {
        setStoredInitData: (state, action: PayloadAction<InitDataState>) => {
            state.userAuth = action.payload.userAuth;
            state.layers = action.payload.layers;
            state.layerStyles = action.payload.layerStyles;
            state.resources = action.payload.resources;
            state.parkCodes = action.payload.parkCodes;
            state.authParkCodes = action.payload.authParkCodes;
            state.parkOfficeCodes = action.payload.parkOfficeCodes;
            state.assetTypeCodes = action.payload.assetTypeCodes;
            state.disasterCodes = action.payload.disasterCodes;
            state.situationCodes = action.payload.situationCodes;
            state.authMenus = action.payload.authMenus;
        },
        setStoredLoginUserInfo: (state, action: PayloadAction<CheckLoginResult>) => {
            state.loginUserInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});
export const { setStoredInitData, setStoredLoginUserInfo } = initDataSlice.actions;

export default initDataSlice.reducer;
