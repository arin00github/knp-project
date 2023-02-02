import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { GetAuthByIdResult } from "../../api/tmsKnp/TmsKnpInterface";
import { AUTH_CODE } from "../../interfaces";

export interface AuthDetailData {
    originalData: GetAuthByIdResult[];
    data: GetAuthByIdResult[];
}

export interface AuthEdited {
    menu_code: string;
    auth_delete: boolean;
    auth_approval: boolean;
}

export interface AuthState {
    loading: boolean;
    rowData?: {
        isDefault: boolean;
        authCode: AUTH_CODE;
    };
    authDetail: {
        originalData: GetAuthByIdResult[];
        data: GetAuthByIdResult[];
    };
    authEditingData: {
        auth_code: AUTH_CODE;
        menu_roles: AuthEdited[];
    };
}

const initialState: AuthState = {
    loading: true,
    rowData: {
        isDefault: false,
        authCode: "",
    },
    authDetail: {
        originalData: [],
        data: [],
    },
    authEditingData: {
        auth_code: "",
        menu_roles: [],
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setStoredAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredAuthSelectedRowData: (
            state,
            action: PayloadAction<{ isDefault: boolean; authCode: AUTH_CODE } | undefined>
        ) => {
            state.rowData = action.payload;
        },
        setStoredAuthDetail: (state, action: PayloadAction<AuthDetailData>) => {
            state.authDetail = action.payload;
        },
        setStoredAuthEditingData: (
            state,
            action: PayloadAction<{ auth_code: AUTH_CODE; menu_roles: AuthEdited[] }>
        ) => {
            state.authEditingData = action.payload;
        },
        resetStoredAuth: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredAuthLoading,
    setStoredAuthSelectedRowData,
    setStoredAuthDetail,
    setStoredAuthEditingData,
    resetStoredAuth,
} = authSlice.actions;

export default authSlice.reducer;
