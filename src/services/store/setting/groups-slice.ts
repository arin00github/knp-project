import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { GetGroupsResult } from "../../api/tmsKnp/TmsKnpInterface";
import { GetSmsGroupsResult } from "../../api/tmsKnp/TmsKnpInterface";

export interface GroupsFilterParams {
    group_name?: string;
    sms_group_name?: string;
}

export interface GroupsState {
    loading: boolean;
    filterParams: GroupsFilterParams;
    selectedIds: string[] | number[];
    selectedNpkGroupRow?: GetGroupsResult;
    selectedSmsGroupRow?: GetSmsGroupsResult;
    isEditFormOpen: boolean;
    searchUserKeyword: string;
}

const initialState: GroupsState = {
    loading: true,
    filterParams: {
        group_name: "",
        sms_group_name: "",
    },
    selectedIds: [],
    isEditFormOpen: false,
    searchUserKeyword: "",
};

export const groupsSlice = createSlice({
    name: "groups",
    initialState: initialState,
    reducers: {
        setStoredGroupsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredGroupsFilterParams: (state, action: PayloadAction<GroupsFilterParams>) => {
            state.filterParams = action.payload;
        },
        setStoredGroupsSelectedIds: (state, action: PayloadAction<string[] | number[]>) => {
            state.selectedIds = action.payload;
        },
        setStoredGroupsIsEditFormOpen: (state, action: PayloadAction<boolean>) => {
            state.isEditFormOpen = action.payload;
        },
        setStoredNpkGroupsSelectedRow: (state, action: PayloadAction<GetGroupsResult | undefined>) => {
            state.selectedNpkGroupRow = action.payload;
        },
        setStoredSmsGroupsSelectedRow: (state, action: PayloadAction<GetSmsGroupsResult | undefined>) => {
            state.selectedSmsGroupRow = action.payload;
        },
        setStoredSmsGroupsSearchKeyword: (state, action: PayloadAction<string>) => {
            state.searchUserKeyword = action.payload;
        },
        resetStoredGroups: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredGroupsLoading,
    setStoredGroupsFilterParams,
    setStoredGroupsSelectedIds,
    setStoredNpkGroupsSelectedRow,
    setStoredSmsGroupsSelectedRow,
    setStoredSmsGroupsSearchKeyword,
    setStoredGroupsIsEditFormOpen,
    resetStoredGroups,
} = groupsSlice.actions;

export default groupsSlice.reducer;
