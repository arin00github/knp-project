/**
 * 자산 관리 컴포넌트, redux slice 정의 파일
 * @file src/services/store/management/assets-slice.ts
 * @author Jang Jeongwon
 * @version 1.0
 * @see none
 * @history
 * - 2022-10-21, 최초 작성
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { LAYER_NPO_MAIN } from "../../interfaces";

export interface AssetsFilterParams {
    layer_id: string;
    asset_nm?: string;
    npk_cd?: string;
    start_dt?: string;
    end_dt?: string;
}

export interface AssetsState {
    loading: boolean;
    filterParams: AssetsFilterParams;
    selectedIds: number[];
}

const initialState: AssetsState = {
    loading: true,
    filterParams: {
        layer_id: LAYER_NPO_MAIN,
        asset_nm: "",
        npk_cd: "",
        start_dt: "",
        end_dt: "",
    },
    selectedIds: [],
};

export const assetsSlice = createSlice({
    name: "assets",
    initialState: initialState,
    reducers: {
        setStoredAssetsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredAssetsFilterParams: (state, action: PayloadAction<AssetsFilterParams>) => {
            state.filterParams = action.payload;
        },
        setStoredAssetsSelectedIds: (state, action: PayloadAction<number[]>) => {
            state.selectedIds = action.payload;
        },
        resetStoredAssets: (state) => {
            state.loading = true;
            state.filterParams = {
                layer_id: LAYER_NPO_MAIN,
                asset_nm: "",
                npk_cd: "",
                start_dt: "",
                end_dt: "",
            };
            state.selectedIds = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const { setStoredAssetsLoading, setStoredAssetsFilterParams, setStoredAssetsSelectedIds, resetStoredAssets } =
    assetsSlice.actions;

export default assetsSlice.reducer;
