import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { GetTemplatesResult } from "../../api/tmsKnp/TmsKnpInterface";

export interface SmsTemplateState {
    loading: boolean;
    selectedIds: number[];
    selectedRow?: GetTemplatesResult;
    isEditFormOpen: boolean;
}

const initialState: SmsTemplateState = {
    loading: true,
    selectedIds: [],
    isEditFormOpen: false,
};

export const smsTemplateSlice = createSlice({
    name: "smsTemplate",
    initialState: initialState,
    reducers: {
        setStoredSmsTemplateLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredSmsTemplateSelectedIds: (state, action: PayloadAction<number[]>) => {
            state.selectedIds = action.payload;
        },
        setStoredSmsTemplateSelectedRow: (state, action: PayloadAction<GetTemplatesResult | undefined>) => {
            state.selectedRow = action.payload;
        },
        setStoredSmsTemplateIsEditFormOpen: (state, action: PayloadAction<boolean>) => {
            state.isEditFormOpen = action.payload;
        },
        resetStoredSmsTemplate: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredSmsTemplateLoading,
    setStoredSmsTemplateSelectedIds,
    setStoredSmsTemplateSelectedRow,
    setStoredSmsTemplateIsEditFormOpen,
    resetStoredSmsTemplate,
} = smsTemplateSlice.actions;

export default smsTemplateSlice.reducer;
