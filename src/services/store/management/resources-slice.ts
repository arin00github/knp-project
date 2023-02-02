import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface ResourcesFilterParams {
    npk_cd?: string;
    asset_nm?: string;
}

export interface ResourcesState {
    loading: boolean;
    filterParams: ResourcesFilterParams;
}

const initialState: ResourcesState = {
    loading: true,
    filterParams: {
        npk_cd: "",
        asset_nm: "",
    },
};

export const resourcesSlice = createSlice({
    name: "resources",
    initialState: initialState,
    reducers: {
        setStoredResourcesLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredResourcesFilterParams: (state, action: PayloadAction<ResourcesFilterParams>) => {
            state.filterParams = action.payload;
        },
        resetStoredResources: (state) => {
            state.loading = true;
            state.filterParams = {
                npk_cd: "",
                asset_nm: "",
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const { setStoredResourcesFilterParams, setStoredResourcesLoading, resetStoredResources } =
    resourcesSlice.actions;

export default resourcesSlice.reducer;
