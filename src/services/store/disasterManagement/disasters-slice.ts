import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { DS_STEP, SITU_LEVEL } from "../../constant";

export interface DisastersFilterParams {
    situation_step?: DS_STEP;
    situation_level1?: SITU_LEVEL;
    start_time?: string;
    end_time?: string;
}

export interface DisastersState {
    loading: boolean;
    filterParams: DisastersFilterParams;
    selectedIds: string[];
}

const initialState: DisastersState = {
    loading: true,
    filterParams: {
        situation_step: "",
        situation_level1: "",
        start_time: "",
        end_time: "",
    },
    selectedIds: [],
};

export const disastersSlice = createSlice({
    name: "disasters",
    initialState: initialState,
    reducers: {
        setStoredDisastersLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredDisastersFilterParams: (state, action: PayloadAction<DisastersFilterParams>) => {
            state.filterParams = action.payload;
        },
        setStoredDisastersSelectedIds: (state, action: PayloadAction<string[]>) => {
            state.selectedIds = action.payload;
        },
        resetStoredDisasters: (state) => {
            state.loading = true;
            state.filterParams = {
                situation_step: "",
                situation_level1: "",
                start_time: "",
                end_time: "",
            };
            state.selectedIds = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredDisastersLoading,
    setStoredDisastersFilterParams,
    setStoredDisastersSelectedIds,
    resetStoredDisasters,
} = disastersSlice.actions;

export default disastersSlice.reducer;
