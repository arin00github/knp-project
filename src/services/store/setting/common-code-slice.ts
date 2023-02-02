import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { GetCommonCodeParams, GetCommonCodeResult } from "../../api/tmsKnp/TmsKnpInterface";

export interface CommonCodeState {
    loading: boolean;
    filterParams: GetCommonCodeParams;
    searchParams: GetCommonCodeParams;
    selectedRow?: {
        type: string;
        data: GetCommonCodeResult;
    };
    isEditFormOpen: boolean;
}

const initialState: CommonCodeState = {
    loading: true,
    searchParams: {
        code: "",
        code_name: "",
    },
    filterParams: {
        code: "",
        code_name: "",
    },
    isEditFormOpen: false,
};

export const commonCodeSlice = createSlice({
    name: "commonCode",
    initialState: initialState,
    reducers: {
        setStoredCommonCodeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredCommonCodeSearchParams: (state, action: PayloadAction<GetCommonCodeParams>) => {
            state.searchParams = action.payload;
        },
        setStoredCommonCodeFilterParams: (state, action: PayloadAction<GetCommonCodeParams>) => {
            state.filterParams = action.payload;
        },
        setStoredCommonCodeSelectedRow: (
            state,
            action: PayloadAction<{ type: string; data: GetCommonCodeResult } | undefined>
        ) => {
            state.selectedRow = action.payload;
        },
        setStoredCommonCodeIsEditFormOpen: (state, action: PayloadAction<boolean>) => {
            state.isEditFormOpen = action.payload;
        },
        resetStoredCommonCode: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredCommonCodeLoading,
    setStoredCommonCodeSearchParams,
    setStoredCommonCodeFilterParams,
    setStoredCommonCodeSelectedRow,
    setStoredCommonCodeIsEditFormOpen,
    resetStoredCommonCode,
} = commonCodeSlice.actions;

export default commonCodeSlice.reducer;
