/**
 * 사용자 관리 컴포넌트, redux slice 정의 파일
 * @file src/services/store/setting/systemSetting_slice.ts
 * @history
 * - 2022-11-04, 최초 작성
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface SystemDataParams {
    id: number;
    file_og_name?: string;
    file_type?: string;
    file_size?: number;
    ordering?: number;
}

export interface SystemSettingState {
    loading: boolean;
    reportData: SystemDataParams[] | undefined;
    checkedDeleteIds: number[];
    checkedDownloadIds: number[];
    reportButtonType: string;
}

const initialState: SystemSettingState = {
    loading: true,
    reportData: undefined,
    checkedDeleteIds: [],
    checkedDownloadIds: [],
    reportButtonType: "",
};

export const SystemSettingSlice = createSlice({
    name: "system",
    initialState: initialState,
    reducers: {
        setStoredReportLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setStoredReportData: (state, action: PayloadAction<SystemDataParams[]>) => {
            state.reportData = action.payload;
        },
        setStoredReportCheckedDeleteIds: (state, action: PayloadAction<number[]>) => {
            state.checkedDeleteIds = action.payload;
        },
        setStoredReportCheckedDownloadIds: (state, action: PayloadAction<number[]>) => {
            state.checkedDownloadIds = action.payload;
        },
        setStoredReportButtonType: (state, action: PayloadAction<string>) => {
            state.reportButtonType = action.payload;
        },
        resetStoredReport: (state) => {
            state.loading = true;
            state.checkedDeleteIds = [];
            state.checkedDownloadIds = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {
    setStoredReportLoading,
    setStoredReportData,
    setStoredReportCheckedDeleteIds,
    setStoredReportCheckedDownloadIds,
    setStoredReportButtonType,
    resetStoredReport,
} = SystemSettingSlice.actions;

export default SystemSettingSlice.reducer;
