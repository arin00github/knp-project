import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommonState {
    activeAppPath?: string;
    locale: string;
    collapsedChange: boolean;
    pageLoading: boolean;
    theme: string;
}

const initialState: CommonState = {
    locale: sessionStorage.getItem("currentLang") ? String(sessionStorage.getItem("currentLang")) : "ko",
    activeAppPath: process.env.REACT_APP_URL,
    pageLoading: false,
    collapsedChange: false,
    theme: "Dark Theme",
};

export const commonSlice = createSlice({
    name: "common",
    initialState: initialState,
    reducers: {
        setStoredActiveApp: (state, action: PayloadAction<string>) => {
            state.activeAppPath = action.payload;
        },
        setStoredLocale: (state, action: PayloadAction<string>) => {
            state.locale = action.payload;
            sessionStorage.setItem("currentLang", action.payload);
        },

        setStoredCollapsedChange: (state, action: PayloadAction<boolean>) => {
            state.collapsedChange = action.payload;
        },
        setStoredPageLoading: (state, action: PayloadAction<boolean>) => {
            state.pageLoading = action.payload;
        },
        setThemeColor: (state, action: PayloadAction<boolean>) => {
            state.pageLoading = action.payload;
        },
    },
});

export const {
    setStoredLocale,
    setStoredActiveApp,
    // setStoredThemeMode,
    setThemeColor,
    setStoredCollapsedChange,
    setStoredPageLoading,
} = commonSlice.actions;

export default commonSlice.reducer;
