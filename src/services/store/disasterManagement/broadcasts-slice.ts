import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { SITU_LEVEL } from "../../constant";

export interface BroadcastsFilterParams {
    situation_level1?: SITU_LEVEL;
    situation_national_park?: string;
    start_time?: string;
    end_time?: string;
}

export interface BroadcastsState {
    loading: boolean;
    filterParams: BroadcastsFilterParams;
    selectedIds: string[];
}

const initialState: BroadcastsState = {
    loading: true,
    filterParams: {
        situation_level1: "",
        situation_national_park: "",
        start_time: "",
        end_time: "",
    },
    selectedIds: [],
};

export const broadcastsSlice = createSlice({
    name: "broadcasts",
    initialState: initialState,
    reducers: {
        setStoredBroadcastsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredBroadcastsFilterParams: (state, action: PayloadAction<BroadcastsFilterParams>) => {
            state.filterParams = action.payload;
        },
        setStoredBroadcastsSelectedIds: (state, action: PayloadAction<string[]>) => {
            state.selectedIds = action.payload;
        },
        resetStoredBroadcasts: (state) => {
            state.loading = true;
            state.filterParams = {
                situation_level1: "",
                situation_national_park: "",
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
    setStoredBroadcastsLoading,
    setStoredBroadcastsFilterParams,
    setStoredBroadcastsSelectedIds,
    resetStoredBroadcasts,
} = broadcastsSlice.actions;

export default broadcastsSlice.reducer;
