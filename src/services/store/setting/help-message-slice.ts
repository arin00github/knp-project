import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { GetTemplatesResult } from "../../api/tmsKnp/TmsKnpInterface";

export interface HelpMessageState {
    loading: boolean;
    selectedIds: string[];
    selectedRow?: GetTemplatesResult;
    isEditFormOpen: boolean;
}

const initialState: HelpMessageState = {
    loading: true,
    selectedIds: [],
    isEditFormOpen: false,
};

export const helpMessageSlice = createSlice({
    name: "helpMessage",
    initialState: initialState,
    reducers: {
        setStoredHelpMessageLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredHelpMessageSelectedIds: (state, action: PayloadAction<string[]>) => {
            state.selectedIds = action.payload;
        },
        setStoredHelpMessageSelectedRow: (state, action: PayloadAction<GetTemplatesResult | undefined>) => {
            state.selectedRow = action.payload;
        },
        setStoredHelpMessageIsEditFormOpen: (state, action: PayloadAction<boolean>) => {
            state.isEditFormOpen = action.payload;
        },
        resetStoredHelpMessage: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredHelpMessageLoading,
    setStoredHelpMessageSelectedIds,
    setStoredHelpMessageSelectedRow,
    setStoredHelpMessageIsEditFormOpen,
    resetStoredHelpMessage,
} = helpMessageSlice.actions;

export default helpMessageSlice.reducer;
