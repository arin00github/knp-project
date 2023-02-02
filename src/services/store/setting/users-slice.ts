import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import {
    GetAuthInfoResult,
    GetCodeInfoResult,
    GetGroupsResult,
    GetUsersByAdminResult,
} from "../../api/tmsKnp/TmsKnpInterface";

export interface UsersFilterParams {
    user_account: string;
    user_name?: string;
    auth_code?: string;
    gid?: string;
}

export interface UsersFormSelectBoxData {
    groups: GetGroupsResult[];
    authInfos: GetAuthInfoResult[];
    positions: GetCodeInfoResult[];
    ranks: GetCodeInfoResult[];
}

export interface UsersState {
    loading: boolean;
    filterParams: {
        user_account: string;
        user_name?: string;
        auth_code?: string;
        gid?: string;
    };
    selectedRow?: GetUsersByAdminResult;
    selectedIds: string[];
    isEditFormOpen: boolean;
    formSelectBoxData: UsersFormSelectBoxData;
}

const initialState: UsersState = {
    loading: true,
    filterParams: {
        user_account: "",
        user_name: "",
        auth_code: "",
        gid: "",
    },
    selectedIds: [],
    isEditFormOpen: false,
    formSelectBoxData: {
        groups: [],
        authInfos: [],
        positions: [],
        ranks: [],
    },
};

export const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        setStoredUsersLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredUsersFilterParams: (state, action: PayloadAction<UsersFilterParams>) => {
            state.filterParams = action.payload;
        },
        setStoredUsersSelectedRow: (state, action: PayloadAction<GetUsersByAdminResult | undefined>) => {
            state.selectedRow = action.payload;
        },
        setStoredUsersIsEditFormOpen: (state, action: PayloadAction<boolean>) => {
            state.isEditFormOpen = action.payload;
        },
        setStoredUsersSelectedIds: (state, action: PayloadAction<string[]>) => {
            state.selectedIds = action.payload;
        },
        setStoredFormSelectBoxData: (state, action: PayloadAction<UsersFormSelectBoxData>) => {
            state.formSelectBoxData = action.payload;
        },
        resetStoredUsers: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredUsersLoading,
    setStoredUsersFilterParams,
    setStoredUsersSelectedRow,
    setStoredUsersSelectedIds,
    setStoredUsersIsEditFormOpen,
    setStoredFormSelectBoxData,
    resetStoredUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
