import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommonState {
    locale: string;
    crumbInfo: {
        name: string;
        path?: string;
    }[];
}

const initialState: CommonState = {
    locale: "ko",
    crumbInfo: [
        {
            name: "Data Model",
            path: "/",
        },
    ],
};

export const commonSlice = createSlice({
    name: "common",
    initialState: initialState,
    reducers: {
        setStoredCurrentCrumb: (
            state,
            action: PayloadAction<
                {
                    name: string;
                    path?: string;
                }[]
            >
        ) => {
            state.crumbInfo = action.payload;
        },
        setStoredLocale: (state, action: PayloadAction<string>) => {
            state.locale = action.payload;
        },
    },
});

export const { setStoredCurrentCrumb, setStoredLocale } = commonSlice.actions;

export default commonSlice.reducer;
