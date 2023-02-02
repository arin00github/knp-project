import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface ManualState {
    loading: boolean;
    selectedIds: number[];
}

const initialState: ManualState = {
    loading: true,
    selectedIds: [],
};

export const manualSlice = createSlice({
    name: "manual",
    initialState: initialState,
    reducers: {
        setStoredManualLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredManualSelectedIds: (state, action: PayloadAction<number[]>) => {
            state.selectedIds = action.payload;
        },
        resetStoredManual: (state) => {
            state.loading = true;
            state.selectedIds = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const { setStoredManualLoading, setStoredManualSelectedIds, resetStoredManual } = manualSlice.actions;

export default manualSlice.reducer;
