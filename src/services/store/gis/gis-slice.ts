/**
 * 3D GIS 컴포넌트, redux slice 정의 파일
 * @file src/services/store/gis/gis-slice.ts
 * @author Ju Seongjin
 * @version 1.0
 * @see none
 * @history
 * - 2022-10-26, 최초 작성
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { GetLayerStylesResult } from "../../api/tmsKnp/TmsKnpInterface";
import { AssetPopupInfo } from "../../interfaces";

export interface GisState {
    allLayers: string[];
    allLayerStyles: GetLayerStylesResult[];
    selectedLayers: string[];
    selectedRefreshMapLayers: { layerId: string; refreshTime: number }[];
    selectedSafetyMapLayers: string[];
    onClickMapLocation: boolean;
    moveCoordinates: string[] | string[][];
    isPopupOpen: boolean;
    isMapInit: boolean;
    trailLayerAssetInfo: AssetPopupInfo | undefined;
    trailLayerSearchAssetInfo: AssetPopupInfo | undefined;
    trailLayerSearchLoading: boolean;
}

const initialState: GisState = {
    allLayers: [],
    allLayerStyles: [],
    selectedLayers: [],
    selectedRefreshMapLayers: [],
    selectedSafetyMapLayers: [],
    onClickMapLocation: false,
    moveCoordinates: [],
    isPopupOpen: false,
    isMapInit: false,
    trailLayerAssetInfo: undefined,
    trailLayerSearchAssetInfo: undefined,
    trailLayerSearchLoading: false,
};

export const gisSlice = createSlice({
    name: "gis",
    initialState: initialState,
    reducers: {
        setStoredAllLayers: (state, action: PayloadAction<string[]>) => {
            state.allLayers = action.payload;
        },
        setStoredAllLayerStyles: (state, action: PayloadAction<GetLayerStylesResult[]>) => {
            state.allLayerStyles = action.payload;
        },
        setStoredSelectedLayers: (state, action: PayloadAction<string[]>) => {
            state.selectedLayers = action.payload;
        },
        setStoredSelectedRefreshMapLayers: (
            state,
            action: PayloadAction<{ layerId: string; refreshTime: number }[]>
        ) => {
            state.selectedRefreshMapLayers = action.payload;
        },
        setStoredSelectedSafetyMapLayers: (state, action: PayloadAction<string[]>) => {
            state.selectedSafetyMapLayers = action.payload;
        },
        setStoredOnClickMapLocation: (state, action: PayloadAction<boolean>) => {
            state.onClickMapLocation = action.payload;
        },
        setStoredMoveCoordinates: (state, action: PayloadAction<string[] | string[][]>) => {
            state.moveCoordinates = action.payload;
        },
        setStoredIsPopupOpen: (state, action: PayloadAction<boolean>) => {
            state.isPopupOpen = action.payload;
        },
        setStoredIsMapInit: (state, action: PayloadAction<boolean>) => {
            state.isMapInit = action.payload;
        },
        setStoredTrailLayerAssetInfo: (state, action: PayloadAction<AssetPopupInfo>) => {
            state.trailLayerAssetInfo = action.payload;
        },
        setStoredTrailLayerSearchAssetInfo: (state, action: PayloadAction<AssetPopupInfo>) => {
            state.trailLayerSearchAssetInfo = action.payload;
        },
        setStoredTrailLayerSearchLoading: (state, action: PayloadAction<boolean>) => {
            state.trailLayerSearchLoading = action.payload;
        },
        resetStoredGis: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredAllLayers,
    setStoredAllLayerStyles,
    setStoredSelectedLayers,
    setStoredSelectedRefreshMapLayers,
    setStoredSelectedSafetyMapLayers,
    setStoredOnClickMapLocation,
    setStoredMoveCoordinates,
    setStoredIsPopupOpen,
    setStoredIsMapInit,
    setStoredTrailLayerSearchAssetInfo,
    setStoredTrailLayerSearchLoading,
    resetStoredGis,
} = gisSlice.actions;

export default gisSlice.reducer;
