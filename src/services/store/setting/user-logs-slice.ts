import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { PURGE } from "redux-persist";

import { GetUserLogsParams } from "../../api/tmsKnp/TmsKnpInterface";

export interface UserLogsState {
    loading: boolean;
    searchParams: GetUserLogsParams;
}

const initialState: UserLogsState = {
    loading: true,
    searchParams: {
        user_account: "",
        login_start_time: String(moment(new Date()).subtract(7, "d").format()),
        login_end_time: String(moment(new Date()).format()),
    },
};

export const userLogsSlice = createSlice({
    name: "userLogs",
    initialState: initialState,
    reducers: {
        setStoredUserLogsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredUserLogsSearchParams: (state, action: PayloadAction<GetUserLogsParams>) => {
            state.searchParams = action.payload;
        },
        resetStoredUserLogs: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const { setStoredUserLogsLoading, setStoredUserLogsSearchParams, resetStoredUserLogs } = userLogsSlice.actions;

export default userLogsSlice.reducer;
