import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { GetCodeInfoResult } from "../../api/tmsKnp/TmsKnpInterface";
export interface SituationStatusParams {
    selectedPark: string;
    selectedSituation: string;
}

export interface SituationStatus {
    situationSpreadLoading: boolean;
    situationStatisticLoading: boolean;
    weatherLoading: boolean;
    resourceLoading: boolean;
    statisticCodes: GetCodeInfoResult[];
    situationStatusParams: SituationStatusParams;
}

const initialState: SituationStatus = {
    situationSpreadLoading: true,
    situationStatisticLoading: true,
    weatherLoading: true,
    resourceLoading: true,
    statisticCodes: [],
    situationStatusParams: {
        selectedPark: "",
        selectedSituation: "",
    },
};

export const situationStatusSlice = createSlice({
    name: "situationStatus",
    initialState: initialState,
    reducers: {
        setStoredSituationSpreadLoading: (state, action: PayloadAction<boolean>) => {
            state.situationSpreadLoading = action.payload;
        },
        setStoredSituationStatisticLoading: (state, action: PayloadAction<boolean>) => {
            state.situationStatisticLoading = action.payload;
        },
        setStoredWeatherLoading: (state, action: PayloadAction<boolean>) => {
            state.weatherLoading = action.payload;
        },
        setStoredResourceLoading: (state, action: PayloadAction<boolean>) => {
            state.resourceLoading = action.payload;
        },
        setStoredStatisticCodes: (state, action: PayloadAction<GetCodeInfoResult[]>) => {
            state.statisticCodes = action.payload;
        },
        setStoredSituationStatusSelectedPark: (state, action: PayloadAction<string>) => {
            state.situationStatusParams.selectedPark = action.payload;
        },
        setStoredSituationStatusSelectedSituation: (state, action: PayloadAction<string>) => {
            state.situationStatusParams.selectedSituation = action.payload;
        },
        resetStoredSituationStatus: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredSituationSpreadLoading,
    setStoredSituationStatisticLoading,
    setStoredWeatherLoading,
    setStoredResourceLoading,
    setStoredStatisticCodes,
    setStoredSituationStatusSelectedPark,
    setStoredSituationStatusSelectedSituation,
    resetStoredSituationStatus,
} = situationStatusSlice.actions;

export default situationStatusSlice.reducer;
