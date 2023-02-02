import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
export interface SpecialStatusParams {
    selectedPark: string;
    selectedSituation: string;
}

export interface SpecialStatusState {
    specialStatusLoading: boolean;
    selectedMidLandWeatherLoading: boolean;
    selectedParkWeatherLoading: boolean;
    specialStatusContentLoading: boolean;
    radarSizeUp: boolean;
    selectedSituationParkCodes: string[];
    isSpecialStatusShow: boolean;
    specialStatusParams: SpecialStatusParams;
}

const initialState: SpecialStatusState = {
    specialStatusLoading: true,
    selectedMidLandWeatherLoading: true,
    selectedParkWeatherLoading: true,
    specialStatusContentLoading: true,
    radarSizeUp: false,
    selectedSituationParkCodes: [],
    isSpecialStatusShow: false,
    specialStatusParams: {
        selectedPark: "",
        selectedSituation: "",
    },
};

export const specialStatusStateSlice = createSlice({
    name: "specialStatus",
    initialState: initialState,
    reducers: {
        setStoredSpecialStatusLoading: (state, action: PayloadAction<boolean>) => {
            state.specialStatusLoading = action.payload;
        },
        setStoredMidLandWeatherLoading: (state, action: PayloadAction<boolean>) => {
            state.selectedMidLandWeatherLoading = action.payload;
        },
        setStoredSelectedParkWeatherLoading: (state, action: PayloadAction<boolean>) => {
            state.selectedParkWeatherLoading = action.payload;
        },
        setStoredSpecialStatusContentLoading: (state, action: PayloadAction<boolean>) => {
            state.specialStatusContentLoading = action.payload;
        },
        setStoredRadarSizeUp: (state, action: PayloadAction<boolean>) => {
            state.radarSizeUp = action.payload;
        },
        setStoredSelectedSituationParkCodes: (state, action: PayloadAction<string[]>) => {
            state.selectedSituationParkCodes = action.payload;
        },
        setStoredIsSpecialStatusShow: (state, action: PayloadAction<boolean>) => {
            state.isSpecialStatusShow = action.payload;
        },
        setStoredSpecialStatusSelectedPark: (state, action: PayloadAction<string>) => {
            state.specialStatusParams.selectedPark = action.payload;
        },
        setStoredSpecialStatusSelectedSituation: (state, action: PayloadAction<string>) => {
            state.specialStatusParams.selectedSituation = action.payload;
        },
        resetStoredSpecialStatus: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredSpecialStatusLoading,
    setStoredMidLandWeatherLoading,
    setStoredSelectedParkWeatherLoading,
    setStoredSpecialStatusContentLoading,
    setStoredRadarSizeUp,
    setStoredSelectedSituationParkCodes,
    setStoredIsSpecialStatusShow,
    setStoredSpecialStatusSelectedPark,
    setStoredSpecialStatusSelectedSituation,
    resetStoredSpecialStatus,
} = specialStatusStateSlice.actions;

export default specialStatusStateSlice.reducer;
