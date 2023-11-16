import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FilterParams = {
    search_word?: string;
};

export interface AssetGroupState {
    loading: boolean;
    selectedRow?: string;
    isFormOpen: boolean;
    filterParams: { search_word?: string };
    selectedIds: string[];
    selectable: boolean;
}

const initialState: AssetGroupState = {
    loading: true,
    selectedRow: undefined,
    selectedIds: [],
    filterParams: {
        search_word: "",
    },
    selectable: true,
    isFormOpen: false,
};

export const assetGroupSlice = createSlice({
    name: "assetGroup",
    initialState,
    reducers: {
        setStoredLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setIsFormOpen: (state, action: PayloadAction<boolean>) => {
            state.isFormOpen = action.payload;
        },
        setStoredSelectedRow: (state, action: PayloadAction<string | undefined>) => {
            state.selectedRow = action.payload;
        },
        setStoredFilterParams: (state, action: PayloadAction<FilterParams>) => {
            state.filterParams = action.payload;
        },
        setStoredSelectedIds: (state, action: PayloadAction<string[]>) => {
            state.selectedIds = action.payload;
        },
        setStoredSelectable: (state, action: PayloadAction<boolean>) => {
            state.selectable = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase("PURGE", () => initialState);
    },
});

export const {
    setIsFormOpen,
    setStoredFilterParams,
    setStoredLoading,
    setStoredSelectable,
    setStoredSelectedIds,
    setStoredSelectedRow,
} = assetGroupSlice.actions;

export default assetGroupSlice.reducer;
