import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { GetSituationResponseResult } from "../../api/tmsKnpNotice/TmsKnpNoticeInterface";

export interface ResponsesState {
    loading: boolean;
    selectedIds: string[];
    selectedRow?: GetSituationResponseResult;
    selectedRowIndex?: number;
    isMapShow: boolean;
}

const initialState: ResponsesState = {
    loading: true,
    selectedIds: [],
    isMapShow: false,
};

export const responsesSlice = createSlice({
    name: "responses",
    initialState: initialState,
    reducers: {
        setStoredResponsesLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredResponsesSelectedIds: (state, action: PayloadAction<string[]>) => {
            state.selectedIds = action.payload;
        },
        setStoredResponsesSelectedRow: (state, action: PayloadAction<GetSituationResponseResult | undefined>) => {
            state.selectedRow = action.payload;
        },
        setStoredResponsesSelectedRowIndex: (state, action: PayloadAction<number>) => {
            state.selectedRowIndex = action.payload;
        },
        setStoredResponsesIsMapShow: (state, action: PayloadAction<boolean>) => {
            state.isMapShow = action.payload;
        },
        resetStoredResponses: (state) => {
            state.loading = true;
            state.selectedIds = [];
            state.selectedRow = undefined;
            state.selectedRowIndex = undefined;
            state.isMapShow = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredResponsesLoading,
    setStoredResponsesSelectedIds,
    setStoredResponsesSelectedRow,
    setStoredResponsesSelectedRowIndex,
    setStoredResponsesIsMapShow,
    resetStoredResponses,
} = responsesSlice.actions;

export default responsesSlice.reducer;
