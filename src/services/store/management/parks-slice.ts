import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface ParksFilterParams {
    npk_nm?: string;
}

export interface ParksState {
    loading: boolean;
    filterParams: ParksFilterParams;
    selectedRowId: string;
    isEditFormOpen: boolean;
}

const initialState: ParksState = {
    loading: true,
    filterParams: {
        npk_nm: "",
    },
    selectedRowId: "",
    isEditFormOpen: false,
};

export const parksSlice = createSlice({
    name: "parks",
    initialState: initialState,
    reducers: {
        setStoredParksLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredParksFilterParams: (state, action: PayloadAction<ParksFilterParams>) => {
            state.filterParams = action.payload;
        },
        setStoredParksSelectedRowId: (state, action: PayloadAction<string>) => {
            state.selectedRowId = action.payload;
        },
        setStoredParksIsEditFormOpen: (state, action: PayloadAction<boolean>) => {
            state.isEditFormOpen = action.payload;
        },
        resetStoredParks: (state) => {
            state.loading = true;
            state.filterParams = {
                npk_nm: "",
            };
            state.selectedRowId = "";
            state.isEditFormOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredParksLoading,
    setStoredParksFilterParams,
    setStoredParksSelectedRowId,
    setStoredParksIsEditFormOpen,
    resetStoredParks,
} = parksSlice.actions;

export default parksSlice.reducer;
